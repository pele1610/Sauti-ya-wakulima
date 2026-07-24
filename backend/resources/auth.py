from flask_restful import Resource
from flask import request
from werkzeug.security import generate_password_hash

from app import db
from models import User, Profile


class Register(Resource):
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        if not email or not password or not role:
            return {"error": "email, password, and role are required"}, 400

        if role not in ["farmer", "buyer", "admin"]:
            return {"error": "role must be farmer, buyer, or admin"}, 400

        if User.query.filter_by(email=email).first():
            return {"error": "email already registered"}, 400

        user = User(
            email=email,
            password_hash=generate_password_hash(password),
            role=role,
        )
        db.session.add(user)
        db.session.flush()

        profile = Profile(user_id=user.id)
        db.session.add(profile)
        db.session.commit()

        return user.to_dict(), 201