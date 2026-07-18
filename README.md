# 💰 Faym Payout System

A production-ready **Node.js + Express.js + MySQL** backend application that simulates an affiliate payout workflow. The system manages sales, advance payouts, wallet balances, withdrawals, reconciliation, and failed payout recovery through RESTful APIs.

---

# 📌 Overview

The Faym Payout System automates the payout lifecycle for affiliate partners. It ensures accurate wallet management by handling advance commissions, final settlements, withdrawals, and payout recovery while enforcing real-world business rules.

---

# 📖 Business Scenario

Consider an affiliate partner named **Mohan**.

Whenever Mohan sells products through Faym:

- Receives **10% of the sale amount** as an advance payout.
- Receives the remaining payout after the order is approved.
- If the order is rejected, the advance payout is deducted from the wallet.
- Can withdraw wallet funds only **once every 24 hours**.
- Gets automatic wallet recovery if a payout fails.

---

# 🔄 Example Workflow

## 1️⃣ Create User

```json
{
  "username": "Mohan"
}
```

**Wallet Balance**

```
₹0
```

---

## 2️⃣ Create Sales

| Product | Sale Amount |
|----------|------------:|
| Nike Shoes | ₹1000 |
| Adidas T-Shirt | ₹2000 |

**Total Sales**

```
₹3000
```

---

## 3️⃣ Advance Payout (10%)

| Product | Advance Payout |
|----------|---------------:|
| Nike Shoes | ₹100 |
| Adidas T-Shirt | ₹200 |

**Wallet Balance**

```
₹300
```

---

## 4️⃣ Reconciliation

Both orders are approved.

| Product | Remaining Payout |
|----------|-----------------:|
| Nike Shoes | ₹900 |
| Adidas T-Shirt | ₹1800 |

**Updated Wallet**

```
₹300
+ ₹900
+ ₹1800
------------
₹3000
```

---

## 5️⃣ Withdrawal

Withdrawal Request

```
₹1000
```

**Wallet Balance**

```
₹3000
- ₹1000
------------
₹2000
```

Trying another withdrawal within 24 hours returns:

```json
{
  "message": "Withdrawal allowed only once every 24 hours"
}
```

---

## 6️⃣ Failed Payout Recovery

If a payout of

```
₹200
```

fails,

the system automatically credits

```
₹200
```

back to the affiliate's wallet.

---

# ✨ Features

- 👤 User Management
- 🛒 Sales Management
- 💸 10% Advance Payout Processing
- ✅ Order Reconciliation
- 👛 Wallet Management
- 💰 Withdrawal System
- ⏰ 24-Hour Withdrawal Rule
- 🔄 Failed Payout Recovery
- 📡 RESTful APIs
- 🗄️ MySQL Database Integration

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MySQL | Relational Database |
| mysql2 | MySQL Driver |
| dotenv | Environment Variable Management |
| Postman | API Testing |

---

# 📂 Project Structure

```text
faym-payout-system
│
├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── sql/
│   └── schema.sql
├── .env.example
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

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

Create a `.env` file in the project root using `.env.example`.

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=faym_payout
```

Replace the placeholder values with your local MySQL configuration.

---

## 4. Import the Database

Import the SQL schema into your MySQL database.

```
sql/schema.sql
```

---

## 5. Run the Application

```bash
npm run dev
```

The server will start at:

```
http://localhost:5000
```

---

# 📬 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/users` | Create a new user |
| GET | `/users` | Retrieve all users |
| POST | `/sales` | Create a new sale |
| GET | `/sales` | Retrieve all sales |
| POST | `/payouts/advance` | Process advance payout |
| POST | `/payouts/reconcile` | Approve or reject a sale |
| POST | `/payouts/recover` | Recover a failed payout |
| GET | `/payouts` | Retrieve payout history |
| POST | `/withdrawals` | Withdraw wallet balance |
| GET | `/withdrawals` | Retrieve withdrawal history |

---

# 🧪 API Testing

Use **Postman** or any API client to test the REST APIs.

Recommended testing order:

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
