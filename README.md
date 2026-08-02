# 🥑 Sauti ya Wakulima

**"Voice of the Farmers"** — a marketplace connecting avocado farmers directly with buyers, replacing informal word-of-mouth sales with a structured, transparent platform.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/python-3.12-blue)
![React](https://img.shields.io/badge/react-18-61DAFB)
![Flask](https://img.shields.io/badge/flask-3.x-black)

No middlemen. No guesswork. Every listing, order, and transaction tracked from harvest to sale.

---

## ✨ Features

- 🔐 JWT-based authentication with role-based access (Farmer, Buyer, Admin)
- 🌱 Farmers post avocado listings — variety (Hass/Fuerte), tree count, availability status
- 🛒 Buyers browse the marketplace and place orders directly on listings
- 📦 Every order records price agreed, harvest date, and weight recorded
- 📊 Paginated listing and order views
- 📈 Deep-query analytics endpoints — buyer counts per listing, average tree count by variety, orders filtered by status
- 🧑‍🌾 Farmer dashboard to create and manage listings
- 🛡️ Admin panel to moderate listings
- 📱 Clean, mobile-friendly UI

---

## 🛠️ Tech Stack

**Backend:** Flask · Flask-RESTful · Flask-SQLAlchemy · Flask-Migrate · Flask-JWT-Extended · Flask-Marshmallow · PostgreSQL

**Frontend:** React (Vite) · React Router · Tailwind CSS

---

## 📂 Project Structure

```
sauti-ya-wakulima/
├── backend/
│   ├── app.py                 # App factory
│   ├── config.py              # Environment-based config
│   ├── models/                # User, Profile, Listing, Order
│   ├── schemas/                # Marshmallow serialization schemas
│   ├── controllers/           # auth, listings, orders, analytics
│   ├── migrations/            # Flask-Migrate history
│   └── seed.py                 # Faker-based sample data
│
└── frontend/
    └── src/
        ├── api/                # API call functions per resource
        ├── components/         # Reusable UI (Navbar, Footer, cards, etc.)
        ├── context/            # AuthContext (JWT + user state)
        ├── hooks/              # useFetch
        ├── pages/              # Home, Login, Register, Marketplace, etc.
        └── routes/             # ProtectedRoute
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL 14+

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env`:

```env
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URI=postgresql://username:password@localhost:5432/sauti_ya_wakulima
```

Create the database, run migrations, and seed sample data:

```bash
createdb sauti_ya_wakulima
flask --app app:create_app db upgrade
python3 seed.py
```

> All seeded users share the password `password123` (admin: `adminpass`).

Run the backend:

```bash
flask --app app:create_app run --debug
```

Backend runs at `http://127.0.0.1:5000`.

### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

Run the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

### Build

```bash
cd frontend
npm run build
```

### Deployment

Backend deploys well to Render (with a managed PostgreSQL add-on); frontend deploys well to Vercel or Netlify. Set `VITE_API_BASE_URL` to your deployed backend URL in your hosting platform's environment settings.

---

## 📸 Screenshots

> _Add screenshots of the Home, Marketplace, and Farmer Dashboard pages here._

| Home | Marketplace | Farmer Dashboard |
|---|---|---|
| _placeholder_ | _placeholder_ | _placeholder_ |

---

## 🔌 API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Create an account (farmer, buyer, or admin) |
| `POST` | `/login` | Log in, returns a JWT |

**Example — Register**
```json
POST /register
{
  "name": "Jane Wanjiru",
  "email": "jane@example.com",
  "password": "password123",
  "role": "farmer"
}
```

**Example — Login response**
```json
{
  "access_token": "eyJhbGciOi...",
  "user": { "id": 1, "name": "Jane Wanjiru", "email": "jane@example.com", "role": "farmer" }
}
```

### Listings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/listings?page=&per_page=` | Public | Paginated list of all listings |
| `POST` | `/listings` | Farmer | Create a listing |
| `GET` | `/listings/<id>` | Public | View one listing |
| `PUT` | `/listings/<id>` | Owner | Update a listing |
| `DELETE` | `/listings/<id>` | Owner/Admin | Delete a listing |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/orders?page=&per_page=` | Authenticated | Role-filtered: buyer sees own, farmer sees incoming, admin sees all |
| `POST` | `/orders` | Buyer | Place an order |
| `GET` | `/orders/<id>` | Authenticated | View one order |
| `PUT` | `/orders/<id>` | Buyer/Farmer/Admin | Update an order (e.g. status) |
| `DELETE` | `/orders/<id>` | Buyer/Admin | Cancel an order |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/analytics/listings-buyer-count` | Buyer count per listing |
| `GET` | `/analytics/avg-tree-count-by-variety` | Average tree count, Hass vs Fuerte |
| `GET` | `/analytics/orders-by-status?status=` | Orders filtered by status, with farmer info |

---

## 🗄️ Database

Four core tables, demonstrating all three relationship types:

- **User ↔ Profile** — one-to-one (`Profile.user_id` is unique)
- **Farmer (User) ↔ Listing** — one-to-many
- **Buyer (User) ↔ Listing**, via **Order** — many-to-many, with `price_agreed`, `harvest_date`, and `weight_recorded` living on the Order as an association object

Schema changes are managed with Flask-Migrate; sample data is generated with Faker in `seed.py`.

---

## 🔒 Security

- Passwords hashed with Werkzeug's `generate_password_hash` (never stored in plain text)
- JWT-based authentication on protected routes, with role claims embedded in the token
- Role-based authorization enforced server-side on every write action (not just hidden in the UI)
- Ownership checks on update/delete (a farmer can only edit their own listings; a buyer can only cancel their own orders)
- Environment-based secrets (`.env`, git-ignored) — never committed
- Input validation on all incoming request data

---

## ⚡ Performance

- Pagination on all list endpoints to avoid loading full tables at once
- Eager, purpose-built deep queries (joins, `group_by`, aggregation) instead of fetching everything and filtering in Python
- Marshmallow schemas control serialization depth, avoiding runaway nested-relationship recursion

---

## 🗺️ Roadmap

- [ ] Farmer profile editing (phone, location)
- [ ] Real-time order status notifications
- [ ] Image uploads for listings
- [ ] SMS integration for farmers without reliable internet access
- [ ] M-Pesa payment integration
- [ ] Deployed production build

---

## 🤝 Contributing

This is currently a solo academic project. If you'd like to suggest improvements, feel free to open an issue describing the change before submitting a pull request.

---

## 📄 License

MIT License.

---

## 📬 Contact

**Pele** — [pelecolo56@gmail.com](mailto:pelecolo56@gmail.com)
GitHub: [github.com/pele1610](https://github.com/pele1610)
