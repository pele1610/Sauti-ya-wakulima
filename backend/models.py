from app import db
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-profile", "-listings", "-orders", "-password_hash")

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)


    profile = db.relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    listings = db.relationship("Listing", back_populates="farmer", cascade="all, delete-orphan")
    orders = db.relationship("Order", back_populates="buyer", cascade="all, delete-orphan")



class Profile(db.Model, SerializerMixin):
    __tablename__ = "profiles"

    serialize_rules = ("-user.profile",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False)
    phone = db.Column(db.String)
    location = db.Column(db.String)
    verification_status = db.Column(db.String, default="pending")

    user = db.relationship("User", back_populates="profile")


class Listing(db.Model, SerializerMixin):
    __tablename__ = "listings"

    serialize_rules = ("-farmer.listings", "-orders.listing")

    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    variety = db.Column(db.String)
    tree_count = db.Column(db.Integer)
    status = db.Column(db.String, default="available")

    farmer = db.relationship("User", back_populates="listings")
    orders = db.relationship("Order", back_populates="listing", cascade="all, delete-orphan")


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    serialize_rules = ("-buyer.orders", "-listing.orders")

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)
    price_agreed = db.Column(db.Float)
    harvest_date = db.Column(db.Date)
    weight_recorded = db.Column(db.Float)
    status = db.Column(db.String, default="pending")

    buyer = db.relationship("User", back_populates="orders")
    listing = db.relationship("Listing", back_populates="orders")