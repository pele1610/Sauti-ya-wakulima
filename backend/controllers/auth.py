from flask_restful import Resource
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request

from app import db
from models import User, Profile
from schemas.user_schema import user_schema


def role_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get("role") != required_role:
                return {"error": "You do not have permission to perform this action"}, 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator


class Register(Resource):
    def post(self):
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        if not name or not email or not password or not role:
            return {"error": "name, email, password, and role are required"}, 400

        if role not in ["farmer", "buyer", "admin"]:
            return {"error": "role must be farmer, buyer, or admin"}, 400

        if User.query.filter_by(email=email).first():
            return {"error": "email already registered"}, 400

        user = User(
            name=name,
            email=email,
            password_hash=generate_password_hash(password),
            role=role,
        )
        db.session.add(user)
        db.session.flush()

        profile = Profile(user_id=user.id)
        db.session.add(profile)
        db.session.commit()

        return user_schema.dump(user), 201


class Login(Resource):
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"error": "email and password are required"}, 400

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password_hash, password):
            return {"error": "invalid email or password"}, 401

        access_token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})

        return {"access_token": access_token, "user": user_schema.dump(user)}, 200


class Protected(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        claims = get_jwt()

        return {
            "message": "You are authenticated!",
            "user_id": user_id,
            "role": claims.get("role"),
        }, 200


class AdminOnly(Resource):
    @role_required("admin")
    def get(self):
        return {"message": "Welcome, admin!"}, 200