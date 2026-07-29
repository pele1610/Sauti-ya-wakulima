from app import db
from sqlalchemy_serializer import SerializerMixin


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