# Ledger Reconciliation Engine

A full-stack ledger processing and reconciliation engine built with Node.js, Express, Prisma, SQLite, Next.js and TypeScript.

---

# Features

## Transaction Ingestion

- CSV upload
- JSON upload
- Multi-account support
- Replace previous dataset on upload
- Row-level validation
- Structured API responses

---

## Reconciliation & Integrity

- Running balance verification
- Duplicate transaction detection
- Out-of-order transaction detection
- Debit and credit validation
- Transfer matching between accounts
- Consolidated turnover calculation
- Self-transfer exclusion from turnover

---

## Categorization

- Rule-based categorization
- Default categories
- User-defined category rules
- Runtime rule upload using JSON
- User rules override default rules
- Uncategorized fallback

Supported categories:

- SALARY
- FOOD
- EMI
- REFUND
- TRANSFER
- ENTERTAINMENT

---

## Recurring Transactions

Detects recurring payments such as:

- Salary
- EMI
- Subscriptions

Displays:

- Description
- Amount
- Count
- Frequency

---

## Dashboard

- Upload Transactions
- Upload Category Rules
- Summary Cards
- Integrity Flags
- Recurring Transactions
- Category Breakdown
- Transaction Table
- Account Filter
- Category Filter
- Month Filter
- Flagged Transactions Filter

---

# Tech Stack

## Backend

- Node.js
- Express
- TypeScript
- Prisma
- SQLite

## Frontend

- Next.js
- React
- Tailwind CSS
- Axios

---

# Setup

## Backend

```bash
cd backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

# API Endpoints

## Upload Transactions

```http
POST /api/upload
```

Supports:

- CSV
- JSON

---

## Upload Category Rules

```http
POST /api/rules
```

Upload a JSON file:

```json
[
  {
    "keywords": ["NETFLIX"],
    "category": "ENTERTAINMENT"
  }
]
```

User rules take precedence over default rules.

---

## Get Transactions

```http
GET /api/transactions
```

Returns all transactions.

---

## Get Reconciliation Summary

```http
GET /api/reconcile
```

Returns:

- Summary
- Duplicate rows
- Transfer matches
- Balance issues
- Recurring transactions
- Category breakdown

---

# Example Summary Output

```json
{
  "totalTransactions": 8,
  "totalCredits": 6200,
  "totalDebits": 4450,
  "netFlow": 1750,
  "consolidatedTurnover": 6650,
  "accountSummary": [
    {
      "accountId": "ACC001",
      "moneyIn": 4200,
      "moneyOut": 2450
    }
  ],
  "categoryBreakdown": {
    "SALARY": 4200,
    "FOOD": 650,
    "EMI": 1800
  },
  "flags": {
    "duplicates": 0,
    "transferMatches": 0,
    "balanceIssues": 0
  }
}
```

# Transfer Matching Heuristic

A debit transaction is paired with a credit transaction when:

1. Amounts are equal.
2. Accounts are different.
3. Dates are within ±1 day.
4. SELF counterparty is preferred.

When multiple matches exist, the earliest unmatched transaction is selected.

Matched transfers are excluded from consolidated turnover to avoid double counting.

---

# Recurrence Detection Heuristic

Recurring transactions are detected using deterministic logic.

Transactions are grouped by:

- Description
- Amount

A transaction is considered recurring when:

1. Description remains similar.
2. Amount remains stable.
3. It appears more than once.

Examples:

- Salary
- EMI
- Subscription payments

The engine returns:

- Description
- Amount
- Count
- Frequency

---

# Sample Data

sample-data/

- sample.csv
- sample.json
- recurring-transactions.csv
- transfers.csv
- duplicate-rows.csv
- balance-issues.csv
- categorisation.json

---

# Folder Structure

```
ledger-reconciliation-engine
│
├── backend
├── frontend
├── sample-data
└── README.md
```

---

# Example Workflows

### Upload Transactions

CSV/JSON → Validation → Categorization → Reconciliation → Dashboard

### Upload Rules

rules.json → Override default categories → Categorization service → Dashboard

---

# Future Improvements

- Authentication
- Persistent category rules
- Charts and analytics
- Export reports
- Pagination
- Multi-user support

# Assumptions

- Transactions are processed in ascending date order per account.
- Opening balance rows may contain neither debit nor credit.
- Balances are rounded to two decimal places.
- Transfer matching uses a configurable ±1 day window.
- If multiple transfer candidates exist, the earliest unmatched transaction is selected.
- User category rules override default rules.


