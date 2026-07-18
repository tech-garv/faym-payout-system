const Sale = require("../models/Sale");
const User = require("../models/User");
const Payout = require("../models/Payout");

const processAdvancePayout = (callback) => {

    Sale.getPendingSales((err, sales) => {

        if (err) return callback(err);

        if (sales.length === 0) {
            return callback(null, "No pending sales found");
        }

        let completed = 0;

        sales.forEach((sale) => {

            const advance = sale.earning * 0.10;

            Payout.createPayout(
                {
                    user_id: sale.user_id,
                    sale_id: sale.id,
                    amount: advance,
                    payout_type: "advance",
                    payout_status: "success"
                },
                (err) => {

                    if (err) return callback(err);

                    User.updateWallet(
                        sale.user_id,
                        advance,
                        (err) => {

                            if (err) return callback(err);

                            Sale.markAdvancePaid(
                                sale.id,
                                advance,
                                (err) => {

                                    if (err) return callback(err);

                                    completed++;

                                    if (completed === sales.length) {
                                        callback(
                                            null,
                                            "Advance payout completed"
                                        );
                                    }

                                }
                            );

                        }
                    );

                }
            );

        });

    });

};

module.exports = {
    processAdvancePayout
};