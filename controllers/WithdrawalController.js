const withdrawalService = require("../services/withdrawalService");

const withdraw = (req, res) => {

   const { user_id, amount } = req.body;

if (!user_id || amount == null) {
    return res.status(400).json({
        message: "user_id and amount are required"
    });
}

if (amount <= 0) {
    return res.status(400).json({
        message: "Amount must be greater than 0"
    });
}
    withdrawalService.processWithdrawal(
        user_id,
        amount,
        (err, message) => {

            if (err) {
                return res.status(400).json({
                    message: err.message
                });
            }

            res.status(200).json({
                message
            });

        }
    );

};
const Withdrawal = require("../models/Withdrawal");

const getWithdrawals = (req, res) => {

    Withdrawal.getWithdrawals((err, results) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(results);

    });

};
module.exports = {
    withdraw,
    getWithdrawals
};