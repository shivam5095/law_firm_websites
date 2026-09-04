# Law Firm Website Frontend

Premium Indian Law Firm client-facing website built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Core Features
- **Modern Design**: Bespoke styling using deep navy, gold, and warm ivory colors.
- **Client Forms**: Client-side validated contact and consultation booking forms.
- **Data Integration**: Statically generated page listings for practice areas, selected experiences, publications, legal insights, and attorney profiles.
- **Performance & SEO**: Configured semantic HTML, Open Graph/Twitter meta structures, and static path prerendering.

---

## Getting Started

### 1. Configure Environment Variables
Create a `.env` file in the root of the `frontend/` directory (see `.env.example` for reference):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FIRM_NAME=[LAW FIRM NAME]
```

### 2. Launch Development server
Run the development application on `http://localhost:3000`:
```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## Available Scripts

- `npm run dev` - Launches local development web server on port `3000`.
- `npm run build` - Creates an optimized production build.
- `npm start` - Serves the production build on port `3000`.
- `npm run lint` - Runs ESLint code quality tests.
