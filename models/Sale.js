const db = require("../config/db");

const createSale = (sale, callback) => {

    const sql = `
        INSERT INTO sales
        (user_id, brand, earning)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [sale.user_id, sale.brand, sale.earning],
        callback
    );
};

const getSales = (callback) => {

    const sql = "SELECT * FROM sales";

    db.query(sql, callback);
};

// NEW
const getPendingSales = (callback) => {

    const sql = `
        SELECT *
        FROM sales
        WHERE status = 'pending'
        AND advance_paid = FALSE
    `;

    db.query(sql, callback);
};

// NEW
const markAdvancePaid = (saleId, amount, callback) => {

    const sql = `
        UPDATE sales
        SET advance_paid = TRUE,
            advance_amount = ?
        WHERE id = ?
    `;

    db.query(sql, [amount, saleId], callback);
};
// NEW
const updateSaleStatus = (saleId, status, callback) => {

    const sql = `
        UPDATE sales
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, saleId], callback);

};

// NEW
const getSaleById = (saleId, callback) => {

    const sql = `
        SELECT *
        FROM sales
        WHERE id = ?
    `;

    db.query(sql, [saleId], callback);

};

module.exports = {
    createSale,
    getSales,
    getPendingSales,
    markAdvancePaid,
    updateSaleStatus,
    getSaleById
};