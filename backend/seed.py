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
