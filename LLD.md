# Low Level Design (LLD)

# 💰 Faym Payout Management System

## 1. Overview

The Faym Payout Management System is a backend application developed using **Node.js, Express.js, and MySQL**. It manages affiliate sales, advance payouts, wallet balances, withdrawals, reconciliation, and payout recovery while enforcing business rules for secure and consistent financial operations.

---

# 2. Objectives

The system aims to:

- Manage affiliate users
- Record product sales
- Process advance payouts
- Perform sale reconciliation
- Maintain wallet balances
- Process withdrawals
- Recover failed payouts
- Maintain payout records

---

# 3. Functional Requirements

The system supports the following modules:

- User Management
- Sales Management
- Advance Payout
- Reconciliation
- Wallet Balance Management
- Withdrawal Processing
- Failed Payout Recovery
- Payout History

---

# 4. Non-Functional Requirements

- Modular MVC Architecture
- RESTful APIs
- MySQL Database
- Easy Maintenance
- Scalable Design
- Business Rule Validation

---

# 5. System Architecture

```
Client (Postman)

        │

        ▼

Express Server (app.js)

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

# 6. Project Structure

```
faym-payout-system

├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   ├── saleController.js
│   ├── payoutController.js
│   └── withdrawalController.js
│
├── models/
│   ├── User.js
│   ├── Sale.js
│   ├── Payout.js
│   └── Withdrawal.js
│
├── routes/
│   ├── userRoutes.js
│   ├── saleRoutes.js
│   ├── payoutRoutes.js
│   └── withdrawalRoutes.js
│
├── services/
│   ├── advancePayoutService.js
│   ├── reconciliationService.js
│   ├── recoveryService.js
│   └── withdrawalService.js
│
├── sql/
│   └── schema.sql
│
├── .env.example
├── app.js
├── package.json
└── README.md
```

---

# 7. Module Description

## User Module

Responsibilities

- Create user
- View users
- Maintain wallet balance

---

## Sales Module

Responsibilities

- Create sales
- Store earnings
- Track sale status
- Track advance payout status

---

## Payout Module

Responsibilities

- Advance payout
- Final payout
- Recovery payout
- Maintain payout history

---

## Withdrawal Module

Responsibilities

- Validate withdrawal request
- Check wallet balance
- Apply 24-hour withdrawal rule
- Record withdrawal history

---

# 8. Database Design

## Users

| Field | Description |
|-------|-------------|
| id | Primary Key |
| username | User Name |
| wallet_balance | Current Wallet Balance |
| last_withdrawal_at | Last Withdrawal Time |

---

## Sales

| Field | Description |
|-------|-------------|
| id | Primary Key |
| user_id | User Reference |
| brand | Product Brand |
| earning | Sale Amount |
| status | pending / approved / rejected |
| advance_paid | Advance Processed |
| advance_amount | Advance Value |

---

## Payouts

| Field | Description |
|-------|-------------|
| id | Primary Key |
| user_id | User Reference |
| sale_id | Sale Reference |
| amount | Payout Amount |
| payout_type | advance / final / adjustment |
| payout_status | success / failed |

---

## Withdrawals

| Field | Description |
|-------|-------------|
| id | Primary Key |
| user_id | User Reference |
| amount | Withdrawal Amount |
| status | success / failed |

---

# 9. Entity Relationship

```
User

│

├─────────────┐

│             │

▼             ▼

Sales     Withdrawals

│

▼

Payouts
```

Relationships

- One User → Many Sales
- One User → Many Withdrawals
- One Sale → Many Payouts

---

# 10. API Design

## User APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /users | Create User |
| GET | /users | Get Users |

---

## Sales APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /sales | Create Sale |
| GET | /sales | Get Sales |

---

## Payout APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /payouts/advance | Process Advance Payout |
| POST | /payouts/reconcile | Reconcile Sale |
| POST | /payouts/recover | Recover Failed Payout |
| GET | /payouts | View Payout History |

---

## Withdrawal APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /withdrawals | Withdraw Balance |
| GET | /withdrawals | View Withdrawals |

---

# 11. Workflow

## Advance Payout

```
Sale Created

      │

      ▼

Pending Sale

      │

      ▼

Advance Already Paid?

      │

 ┌────┴────┐

 │         │

Yes        No

 │         │

Stop       ▼

      Calculate 10%

            │

            ▼

      Update Wallet

            │

            ▼

 Create Payout Record

            │

            ▼

 Mark Advance Paid
```

---

## Sale Reconciliation

```
Update Sale Status

        │

        ▼

Approved?

 ┌──────┴──────┐

 │             │

Yes            No

 │             │

 ▼             ▼

Credit      Deduct

Wallet      Advance
```

---

## Withdrawal

```
Withdrawal Request

        │

        ▼

Check Wallet

        │

        ▼

Check 24 Hours

        │

 ┌──────┴──────┐

 │             │

Reject      Allow

              │

              ▼

      Debit Wallet

              │

              ▼

 Create Withdrawal
```

---

## Failed Recovery

```
Payout Failed

      │

      ▼

Refund Wallet

      │

      ▼

Update Payout Status
```

---

# 12. Business Rules

### Advance Payout

- Only pending sales qualify.
- Advance payout is 10% of sale amount.
- Advance payout is processed only once.

### Reconciliation

- Approved sales receive the remaining payout.
- Rejected sales reverse the advance payout if applicable.

### Withdrawal

- Wallet balance must be sufficient.
- Only one withdrawal is allowed every 24 hours.

### Recovery

- Failed payouts are refunded to the user's wallet.

---

# 13. Error Handling

The application handles scenarios such as:

- User not found
- Sale not found
- Invalid sale status
- Duplicate advance payout
- Insufficient wallet balance
- Withdrawal within 24 hours
- Failed payout recovery
- Invalid request data

---

# 14. Design Decisions

### MVC Architecture

Separates routing, business logic, and database operations for better maintainability.

### Service Layer

Business logic is isolated from controllers, making the application easier to extend and test.

### MySQL

Chosen for transactional consistency and relational integrity.

### Wallet Balance

The wallet balance is maintained on the user record to provide fast balance lookups while updates are handled through business logic.

---

# 15. Scalability

Future enhancements may include:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Swagger/OpenAPI Documentation
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline
- Cloud Deployment
- Redis Caching
- Asynchronous Processing using RabbitMQ/Kafka

---

# 16. Conclusion

The Faym Payout Management System follows a clean MVC architecture with a dedicated service layer. The design enforces payout business rules, manages wallet balances, prevents duplicate advance payouts, supports reconciliation and recovery, and provides a maintainable foundation for future enhancements.
