from app import db
from sqlalchemy_serializer import SerializerMixin


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    serialize_rules = ("-buyer.orders", "-listing.orders")

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)
    price_agreed = db.Column(db.Float)
    harvest_date = db.Column(db.Date)
    quantity_kg = db.Column(db.Float)
    status = db.Column(db.String, default="pending")

    buyer = db.relationship("User", back_populates="orders")
    listing = db.relationship("Listing", back_populates="orders")