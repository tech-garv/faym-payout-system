const advanceService = require("../services/advancePayoutService");
const reconciliationService = require("../services/reconciliationService");
const advancePayout = (req, res) => {
    const { saleId } = req.body;

if (!saleId) {
    return res.status(400).json({
        message: "saleId is required"
    });
}
    advanceService.processAdvancePayout((err, message) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message
        });

    });

};
const reconcileSale = (req, res) => {

    const { saleId, status } = req.body;

if (!saleId || !status) {
    return res.status(400).json({
        message: "saleId and status are required"
    });
}

if (status !== "approved" && status !== "rejected") {
    return res.status(400).json({
        message: "Status must be approved or rejected"
    });
}

    reconciliationService.reconcileSale(
        saleId,
        status,
        (err, message) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(200).json({
                message
            });

        }
    );

};
const recoveryService = require("../services/recoveryService");

const recoverPayout = (req, res) => {

    const { payoutId } = req.body;

if (!payoutId) {
    return res.status(400).json({
        message: "payoutId is required"
    });
}

    recoveryService.recoverFailedPayout(
        payoutId,
        (err, message) => {

            if (err) {
                return res.status(400).json({
                    message: err.message
                });
            }

            res.json({
                message
            });

        }
    );

};
const Payout = require("../models/Payout");

const getPayouts = (req, res) => {

    Payout.getPayouts((err, results) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(results);

    });

};
module.exports = {
    advancePayout,
    reconcileSale,
    recoverPayout,
    getPayouts
};
