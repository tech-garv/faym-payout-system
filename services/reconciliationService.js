const Sale = require("../models/Sale");
const User = require("../models/User");
const Payout = require("../models/Payout");

const reconcileSale = (saleId, status, callback) => {

    Sale.getSaleById(saleId, (err, result) => {

        if (err) return callback(err);

        if (result.length === 0) {
            return callback(new Error("Sale not found"));
        }

        const sale = result[0];

        Sale.updateSaleStatus(saleId, status, (err) => {

            if (err) return callback(err);

            if (status === "approved") {

                const remainingAmount =
                    sale.earning - sale.advance_amount;

                Payout.createPayout(
                    {
                        user_id: sale.user_id,
                        sale_id: sale.id,
                        amount: remainingAmount,
                        payout_type: "final",
                        payout_status: "success"
                    },
                    (err) => {

                        if (err) return callback(err);

                        User.updateWallet(
                            sale.user_id,
                            remainingAmount,
                            (err) => {

                                if (err) return callback(err);

                                callback(
                                    null,
                                    "Sale approved. Final payout completed."
                                );

                            }
                        );

                    }
                );

            } else if (status === "rejected") {

                Payout.createPayout(
                    {
                        user_id: sale.user_id,
                        sale_id: sale.id,
                        amount: -sale.advance_amount,
                        payout_type: "adjustment",
                        payout_status: "success"
                    },
                    (err) => {

                        if (err) return callback(err);

                        User.deductWallet(
                            sale.user_id,
                            sale.advance_amount,
                            (err) => {

                                if (err) return callback(err);

                                callback(
                                    null,
                                    "Sale rejected. Advance recovered."
                                );

                            }
                        );

                    }
                );

            } else {

                callback(new Error("Invalid status"));

            }

        });

    });

};

module.exports = {
    reconcileSale
};