const Sale = require("../models/Sale");

const createSale = (req, res) => {

    const { user_id, brand, earning } = req.body;

if (!user_id || !brand || earning == null) {
    return res.status(400).json({
        message: "user_id, brand and earning are required"
    });
}

if (earning <= 0) {
    return res.status(400).json({
        message: "Earning must be greater than 0"
    });
}

    Sale.createSale(
        { user_id, brand, earning },
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "Sale created successfully"
            });

        }
    );

};

const getSales = (req, res) => {

    Sale.getSales((err, sales) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json(sales);

    });

};

module.exports = {
    createSale,
    getSales
};