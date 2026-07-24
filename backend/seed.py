from datetime import date
import random
from faker import Faker
from werkzeug.security import generate_password_hash

from app import create_app, db
from models import User, Profile, Listing, Order

fake = Faker()
app = create_app()

VARIETIES = ["Hass", "Fuerte"]
LISTING_STATUSES = ["available", "sold_out"]
ORDER_STATUSES = ["pending", "confirmed", "completed"]


with app.app_context():
    print("Clearing existing data...")
    Order.query.delete()
    Listing.query.delete()
    Profile.query.delete()
    User.query.delete()
    db.session.commit()

    print("Seeding farmers...")
    farmers = []
    for _ in range(8):
        user = User(
            email=fake.unique.email(),
            password_hash=generate_password_hash("password123"),
            role="farmer",
        )
        db.session.add(user)
        db.session.flush()
        profile = Profile(
            user_id=user.id,
            phone=fake.phone_number(),
            location=fake.city(),
            verification_status=random.choice(["pending", "verified"]),
        )
        db.session.add(profile)
        farmers.append(user)