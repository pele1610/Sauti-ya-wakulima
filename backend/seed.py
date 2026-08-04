from datetime import date
import random
from faker import Faker
from werkzeug.security import generate_password_hash
from app import create_app, db
from models import User, Profile, Listing, Order

fake = Faker()
app = create_app()

# my seed file
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

    print("Seeding buyers...")
    buyers = []
    for _ in range(8):
        user = User(
            email=fake.unique.email(),
            password_hash=generate_password_hash("password123"),
            role="buyer",
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
        buyers.append(user)

    print("Seeding an admin...")
    admin = User(
        email="admin@sautiyawakulima.com",
        password_hash=generate_password_hash("adminpass"),
        role="admin",
    )
    db.session.add(admin)
    db.session.flush()
    db.session.add(Profile(user_id=admin.id, phone=fake.phone_number(), location=fake.city(), verification_status="verified"))
    db.session.commit()

    print("Seeding listings...")
    listings = []
    for _ in range(22):
        listing = Listing(
            farmer_id=random.choice(farmers).id,
            variety=random.choice(VARIETIES),
            acreage=round(random.uniform(0.5, 10), 2),
            price_per_kg=round(random.uniform(60, 90), 2),
            status=random.choice(LISTING_STATUSES),
        )
        db.session.add(listing)
        listings.append(listing)
    db.session.commit()

    print("Seeding orders...")
    for _ in range(18):
        listing = random.choice(listings)
        order = Order(
            buyer_id=random.choice(buyers).id,
            listing_id=listing.id,
            price_agreed=round(random.uniform(60, 90), 2),
            harvest_date=fake.date_between(start_date="-30d", end_date="+30d"),
            quantity_kg=round(random.uniform(20, 300), 2),
            status=random.choice(ORDER_STATUSES),
        )
        db.session.add(order)
    db.session.commit()

    print("Seeding complete!")