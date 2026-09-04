# Law Firm Website Backend - REST API

Production-ready Express.js & TypeScript API server backing the client-facing website and admin dashboard.

## Tech Stack
- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database Access**: PostgreSQL & Prisma ORM
- **Security**: Helmet, CORS origin checks, Rate-limiting (strict limit for submissions and logins), Zod body validations, JWT authorization headers, bcrypt password hashing.
- **Mailer**: Resend API integration.

---

## Getting Started

### 1. Configure Environment Variables
Create a `.env` file in the root of the `backend/` directory (see `.env.example` for details):
```env
PORT=5000
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
RESEND_API_KEY=re_yourkey
CONTACT_EMAIL=anandkrmaurya13@gmail.com
ADMIN_EMAIL=admin@lawfirm.com
ADMIN_PASSWORD=adminpassword123
NODE_ENV=development
```

### 2. Database Migrations
Run these commands to apply the PostgreSQL schema migrations and generate the client code:
```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run DB Migrations
npm run prisma:migrate

# Seed Admin User
npm run prisma:seed
```

### 3. Run Development Server
Start the Express server on `http://localhost:5000`:
```bash
npm run dev
```

---

## Available Scripts

- `npm run dev` - Launches backend server via nodemon with live reload.
- `npm run build` - Compiles TypeScript files into the `/dist` output directory.
- `npm start` - Serves the compiled production build from `/dist/server.js`.
- `npm run lint` - Runs ESLint compiler checks.
- `npm run prisma:generate` - Updates the local `@prisma/client` schema mapping.
- `npm run prisma:migrate` - Applies schema modifications to the PostgreSQL database.
- `npm run prisma:seed` - Creates the default admin credential record in the database.
- `npm run prisma:studio` - Launches the interactive Prisma data browser GUI.
