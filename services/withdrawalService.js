const User = require("../models/User");
const Withdrawal = require("../models/Withdrawal");

const processWithdrawal = (userId, amount, callback) => {

    User.getUserById(userId, (err, result) => {

        if (err) return callback(err);

        if (result.length === 0)
            return callback(new Error("User not found"));

        const user = result[0];

        if (user.wallet_balance < amount) {
            return callback(new Error("Insufficient wallet balance"));
        }

        if (user.last_withdrawal_at) {

            const last = new Date(user.last_withdrawal_at);
            const now = new Date();

            const diff =
                (now - last) / (1000 * 60 * 60);

            if (diff < 24) {
                return callback(
                    new Error(
                        "Withdrawal allowed only once every 24 hours"
                    )
                );
            }

        }

        Withdrawal.createWithdrawal(
            {
                user_id: userId,
                amount,
                status: "success"
            },
            (err) => {

                if (err) return callback(err);

                User.deductWallet(
                    userId,
                    amount,
                    (err) => {

                        if (err) return callback(err);

                        User.updateLastWithdrawal(
                            userId,
                            (err) => {

                                if (err) return callback(err);

                                callback(
                                    null,
                                    "Withdrawal successful"
                                );

                            }
                        );

                    }
                );

            }
        );

    });

};

module.exports = {
    processWithdrawal
};