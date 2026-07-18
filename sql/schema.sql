CREATE DATABASE IF NOT EXISTS faym_payout;
USE faym_payout;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    wallet_balance DECIMAL(10,2) DEFAULT 0,
    last_withdrawal_at DATETIME DEFAULT NULL
);

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    earning DECIMAL(10,2) NOT NULL,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    advance_paid BOOLEAN DEFAULT FALSE,
    advance_amount DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE payouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sale_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payout_type ENUM('advance','final','adjustment') NOT NULL,
    payout_status ENUM('success','failed') DEFAULT 'success',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (sale_id) REFERENCES sales(id)
);

CREATE TABLE withdrawals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('success','failed') DEFAULT 'success',
    FOREIGN KEY (user_id) REFERENCES users(id)
);