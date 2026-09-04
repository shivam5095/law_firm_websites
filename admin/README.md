# Law Firm Website Admin Dashboard

Standalone administrator management console built with Next.js and TypeScript, communicating with the Express REST API.

## Core Features
- **Secure Authentication**: JWT-based session verification with automatic login redirection on session expiry (401 response).
- **Consultation Ledger**: View matter requests, filter by status, search description text, and update consultation workflows (NEW, CONTACTED, IN_PROGRESS, CLOSED).
- **Inquiry Management**: Review contact form dispatches, update client-contact status, and securely delete records with deletion confirmations.
- **Responsive Layout**: Sidebar layout tailored for desktop, tablet, and mobile browsers.

---

## Getting Started

### 1. Configure Environment Variables
Verify or create a `.env` file in the root of the `admin/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Launch Development server
Run the development application on `http://localhost:3001`:
```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## Available Scripts

- `npm run dev` - Launches local development web server on port `3001`.
- `npm run build` - Creates an optimized production build.
- `npm start` - Serves the production build on port `3001`.
- `npm run lint` - Runs ESLint code quality tests.
