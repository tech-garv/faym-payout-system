const db = require("../config/db");

const createPayout = (payout, callback) => {

    const sql = `
        INSERT INTO payouts
        (
            user_id,
            sale_id,
            amount,
            payout_type,
            payout_status
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            payout.user_id,
            payout.sale_id,
            payout.amount,
            payout.payout_type,
            payout.payout_status
        ],
        callback
    );

};

const getPayouts = (callback) => {

    const sql = "SELECT * FROM payouts";

    db.query(sql, callback);

};
const getPayoutById = (payoutId, callback) => {

    const sql = `
        SELECT *
        FROM payouts
        WHERE id = ?
    `;

    db.query(sql, [payoutId], callback);

};

const updatePayoutStatus = (payoutId, status, callback) => {

    const sql = `
        UPDATE payouts
        SET payout_status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, payoutId], callback);

};
module.exports = {
    createPayout,
    getPayouts,
    getPayoutById,
    updatePayoutStatus
};