from app import db
from sqlalchemy_serializer import SerializerMixin


class Profile(db.Model, SerializerMixin):
    __tablename__ = "profiles"

    serialize_rules = ("-user.profile",)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False)
    phone = db.Column(db.String)
    location = db.Column(db.String)
    verification_status = db.Column(db.String, default="pending")

    user = db.relationship("User", back_populates="profile")