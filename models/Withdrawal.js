const db = require("../config/db");

const createWithdrawal = (withdrawal, callback) => {

    const sql = `
        INSERT INTO withdrawals
        (user_id, amount, status)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            withdrawal.user_id,
            withdrawal.amount,
            withdrawal.status
        ],
        callback
    );

};

const getWithdrawals = (callback) => {

    const sql = "SELECT * FROM withdrawals";

    db.query(sql, callback);

};

module.exports = {
    createWithdrawal,
    getWithdrawals
};