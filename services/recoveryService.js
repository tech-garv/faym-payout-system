const Payout = require("../models/Payout");
const User = require("../models/User");

const recoverFailedPayout = (payoutId, callback) => {

    Payout.getPayoutById(payoutId, (err, result) => {

        if (err) return callback(err);

        if (result.length === 0)
            return callback(new Error("Payout not found"));

        const payout = result[0];

        Payout.updatePayoutStatus(
            payoutId,
            "failed",
            (err) => {

                if (err) return callback(err);

                User.updateWallet(
                    payout.user_id,
                    payout.amount,
                    (err) => {

                        if (err) return callback(err);

                        callback(
                            null,
                            "Recovery completed successfully"
                        );

                    }
                );

            }
        );

    });

};

module.exports = {
    recoverFailedPayout
};