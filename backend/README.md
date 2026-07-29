# Sauti ya Wakulima — Backend

Small marketplace API for farmers to list trees and buyers to place orders.

## Tech stack
- Python 3.10+
- Flask
- SQLAlchemy + Flask-Migrate
- PostgreSQL
- sqlalchemy-serializer

## Models (high level)
- User: email, password_hash, role; one-to-one Profile; has Listings and Orders.
- Profile: phone, location, verification_status.
- Listing: farmer, variety, tree_count, status.
- Order: buyer, listing, price_agreed, harvest_date, weight_recorded, status.

Serialization rules are configured in models to avoid recursive nesting and hide sensitive fields.

## Setup
1. Clone repository
2. Create virtualenv and install deps:
   - python -m venv venv
   - source venv/bin/activate
   - pip install -r requirements.txt
3. Configure environment variables:
   - DATABASE_URL (e.g. postgres://USER:PASS@HOST:PORT/DB)
   - FLASK_APP=app
   - FLASK_ENV=development
   - SECRET_KEY
4. Initialize database:
   - flask db init
   - flask db migrate -m "init"
   - flask db upgrade
5. Run:
   - flask run

## API (examples)
- POST /auth/register — register user
- POST /auth/login — obtain auth token/session
- GET/POST /profiles — manage profile
- GET/POST /listings — create and view listings
- GET/POST /orders — create and view orders

(Refer to route handlers for exact payloads and auth requirements.)

## Testing
- Add tests under tests/ and run with pytest.

## Contributing
- Fork, create branch, open PR. Follow repository code style and tests.

## License
MIT