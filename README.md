# Portfolio Backend — AI & Fullstack Developer Services API

REST API for managing the service catalog of a Fullstack & AI Engineer
portfolio. Anyone can browse the public catalog; only the authenticated
admin, using a JWT, can create, edit, or delete services.

**Live URL:** https://portfolio-backend-oypt.onrender.com

## Tech stack

- Node.js + TypeScript (real ESM, `NodeNext`)
- Express 5
- JSON-file persistence (`src/data/`)
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWT authentication
- `zod` for schema validation
- `cors` + `dotenv`

## Local installation

```bash
git clone https://github.com/camilachirinocastell/portfolio-backend.git
cd portfolio-backend
pnpm install
cp .env.example .env   # fill in JWT_SECRET and PORT
pnpm run dev
```

The server runs on `http://localhost:3000` (or whichever `PORT` you set).

## Environment variables

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on (e.g. `3000`) |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

## Endpoints

### Auth (`/users`)

| Method | Route | Description | Protected |
|---|---|---|---|
| POST | `/users/register` | Registers an admin account | No |
| POST | `/users/login` | Returns a JWT valid for 2h | No |

### Services (`/items`)

| Method | Route | Description | Protected |
|---|---|---|---|
| GET | `/items` | Lists the catalog. Accepts `?category=` (case-insensitive) | No |
| POST | `/items` | Creates a new service | Yes (Bearer token) |
| PUT | `/items/:id` | Edits a service (partial or full) | Yes (Bearer token) |
| DELETE | `/items/:id` | Deletes a service | Yes (Bearer token) |

To test protected routes without third-party credentials, register your own
account via `POST /users/register` and use the token returned by
`POST /users/login`.

## API documentation & testing

Full interactive documentation, generated from the Postman collection used
during development, is published here:

**https://documenter.getpostman.com/view/58034286/2sBYAxPox9**

It covers the entire flow — register, login, public catalog, category
filtering, and the full protected CRUD (create, update, delete) — and can be
run end to end directly from the docs page.

## Project structure

```
src/
├── config/        # Centralized environment variables
├── data/          # JSON-based persistence (items.json, users.json)
├── models/        # TypeScript interfaces
├── services/      # Business logic
├── controllers/   # Request/response handling
├── middlewares/   # Auth (JWT), Zod validation, global error handling
├── schemas/       # Zod validation schemas
├── routes/        # Endpoint definitions
└── app.ts         # Express app configuration
```

## Author

Camila Chirino Castell —
💻 Portfolio: [camilachirinocastell-portfolio.netlify.app](https://camilachirinocastell-portfolio.netlify.app)
🐙 GitHub: [github.com/camilachirinocastell](https://github.com/camilachirinocastell)
👤 LinkedIn: [www.linkedin.com/in/camila-chirino-castell](https://www.linkedin.com/in/camila-chirino-castell)