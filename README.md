# 💰 Faym Payout System

A production-ready **Node.js + Express.js + MySQL** backend application that simulates an affiliate payout workflow. The system manages sales, advance payouts, wallet balances, withdrawals, reconciliation, and failed payout recovery through RESTful APIs.

---

# 📌 Overview

The Faym Payout System automates the payout lifecycle for affiliate partners. It ensures accurate wallet management by handling advance commissions, final settlements, withdrawals, and payout recovery while enforcing real-world business rules.

---

# 🎯 Assignment Objectives

This project was developed as part of the **Faym SDE Intern Assignment** to demonstrate:

* Low-Level System Design (LLD)
* REST API Design
* Relational Database Design
* Business Rule Implementation
* MVC Architecture
* Wallet & Payout Management

---

# 📖 Business Scenario

Consider an affiliate partner named **Mohan**.

Whenever Mohan sells products through Faym:

* Receives **10%** of every eligible pending sale as an advance payout.
* Receives the remaining payout after the sale is approved.
* If a sale is rejected, the advance payout is adjusted from the final settlement.
* Can withdraw wallet funds only once every **24 hours**.
* Gets automatic wallet recovery if a payout fails.

---

# ✨ Features

* 👤 User Management
* 🛒 Sales Management
* 💸 10% Advance Payout
* ✅ Sale Reconciliation
* 👛 Wallet Management
* 💰 Withdrawal Processing
* ⏰ One Withdrawal Every 24 Hours
* 🔄 Failed Payout Recovery
* 📜 Payout History
* 📡 RESTful APIs
* 🗄️ MySQL Integration
* 🧱 MVC Architecture

---

# 🏗️ System Architecture

```text
Client (Postman)

        │

        ▼

Express Server

        │

        ▼

Routes

        │

        ▼

Controllers

        │

        ▼

Services

        │

        ▼

Models

        │

        ▼

MySQL Database
```

---

# 📂 Project Structure

```text
faym-payout-system/
│
├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── sql/
│   └── schema.sql
├── .env.example
├── .gitignore
├── LLD.md
├── README.md
├── app.js
├── server.js
├── package.json
└── package-lock.json
```

---

# 🛠️ Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime Environment   |
| Express.js | Backend Framework     |
| MySQL      | Relational Database   |
| mysql2     | MySQL Driver          |
| dotenv     | Environment Variables |
| Postman    | API Testing           |

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/tech-garv/faym-payout-system.git
cd faym-payout-system
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file using `.env.example`.

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=faym_payout
```

---

## 4. Create Database

Import the SQL schema.

```text
sql/schema.sql
```

---

## 5. Run Application

```bash
npm run dev
```

Server starts at

```text
http://localhost:5000
```

---

# 📬 API Endpoints

## Users

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | `/users` | Create User |
| GET    | `/users` | Get Users   |

---

## Sales

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | `/sales` | Create Sale |
| GET    | `/sales` | Get Sales   |

---

## Payouts

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/payouts/advance`   | Process Advance Payout |
| POST   | `/payouts/reconcile` | Approve or Reject Sale |
| POST   | `/payouts/recover`   | Recover Failed Payout  |
| GET    | `/payouts`           | Get Payout History     |

---

## Withdrawals

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/withdrawals` | Withdraw Wallet Balance |
| GET    | `/withdrawals` | Withdrawal History      |

---

# 🔄 Example Workflow

### Step 1

Create User

↓

Wallet Created

↓

₹0 Balance

---

### Step 2

Create Pending Sale

↓

₹1000 Sale

↓

Advance Eligible

---

### Step 3

Advance Payout

↓

10%

↓

₹100 Credited

---

### Step 4

Admin Reconciliation

Approved

↓

Remaining ₹900 Credited

OR

Rejected

↓

₹100 Adjusted

---

### Step 5

Withdrawal

↓

Wallet Balance Checked

↓

24-Hour Rule Checked

↓

Withdrawal Created

---

### Step 6

Failed Recovery

↓

Gateway Failure

↓

Wallet Refunded

---

# 📄 Documentation

The repository includes:

* **README.md** – Project overview and setup guide.
* **LLD.md** – Low-Level Design including architecture, workflows, database design, class design, APIs, and design decisions.
* **sql/schema.sql** – Database schema.

---

# 🧪 Testing

The APIs can be tested using **Postman** or any REST client.

Recommended order:

1. Create User
2. Create Sale
3. Process Advance Payout
4. Reconcile Sale
5. Withdraw Funds
6. Recover Failed Payout



---

# 👨‍💻 Author

**Garv Puri**

B.Tech Computer Science Engineering

Backend Developer | Node.js | Express.js | MySQL

GitHub: https://github.com/tech-garv

---

# 📜 License

This project is developed for educational and internship assessment purposes.
