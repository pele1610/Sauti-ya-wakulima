from app import db
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-profile.user", "-listings.farmer", "-orders.buyer", "-password_hash")

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)

    profile = db.relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    listings = db.relationship("Listing", back_populates="farmer", cascade="all, delete-orphan")
    orders = db.relationship("Order", back_populates="buyer", cascade="all, delete-orphan")