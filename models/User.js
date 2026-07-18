const db = require("../config/db");

const createUser = (username, callback) => {

    const sql = "INSERT INTO users (username) VALUES (?)";

    db.query(sql, [username], callback);

};

const getUsers = (callback) => {

    const sql = "SELECT * FROM users";

    db.query(sql, callback);

};

// NEW
const updateWallet = (userId, amount, callback) => {

    const sql = `
        UPDATE users
        SET wallet_balance = wallet_balance + ?
        WHERE id = ?
    `;

    db.query(sql, [amount, userId], callback);

};

const getUserById = (userId, callback) => {

    const sql = `
        SELECT *
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], callback);

};

const deductWallet = (userId, amount, callback) => {

    const sql = `
        UPDATE users
        SET wallet_balance = wallet_balance - ?
        WHERE id = ?
    `;

    db.query(sql, [amount, userId], callback);

};

const updateLastWithdrawal = (userId, callback) => {

    const sql = `
        UPDATE users
        SET last_withdrawal_at = NOW()
        WHERE id = ?
    `;

    db.query(sql, [userId], callback);

};
module.exports = {
    createUser,
    getUsers,
    updateWallet,
    deductWallet,
    getUserById,
    updateLastWithdrawal
};