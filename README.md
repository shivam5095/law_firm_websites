# Premium Indian Law Firm Website

A production-ready, strictly decoupled web application architecture designed for a premium Indian Law Firm.

## Project Structure
This repository contains three independent projects that communicate solely via REST APIs:
- **`backend/`**: Node.js & Express.js server providing REST APIs, JWT/bcrypt authentication, PostgreSQL database operations using Prisma ORM, and Resend email alerts..
- **`frontend/`**: Next.js client-facing website showcasing attorney profiles, experience, publications, practice areas, and validated consultation booking forms.
- **`admin/`**: Standalone Next.js administrator dashboard to manage consultation requests and contact messages.

---

## Local Development Setup

To run the entire system locally, configure each project and launch them in three separate terminals:

### 1. Backend Setup & Run (Terminal 1)
Prerequisites: A running PostgreSQL instance.
```bash
cd backend
npm install

# 1. Create a .env file and define DATABASE_URL and ADMIN_PASSWORD
# 2. Generate Prisma Client and apply migrations
npm run prisma:generate
npm run prisma:migrate

# 3. Create the initial administrator user
npm run prisma:seed

# 4. Start backend on http://localhost:5000
npm run dev
```

### 2. Frontend Setup & Run (Terminal 2)
```bash
cd frontend
npm install

# Start client website on http://localhost:3000
npm run dev
```

### 3. Admin Panel Setup & Run (Terminal 3)
```bash
cd admin
npm install

# Start dashboard on http://localhost:3001
npm run dev
```

---

## Verification & Checks
To verify production readiness, you can compile each project independently:
```bash
# Verify backend compiles cleanly
cd backend && npm run build

# Verify client website builds successfully
cd frontend && npm run build

# Verify admin panel compiles successfully
cd admin && npm run build
```
See the respective subproject `README.md` files for detailed scripting endpoints and variable options.
