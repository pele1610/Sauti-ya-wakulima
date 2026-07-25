from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from app import db
from models import Order, Listing


class OrderListResource(Resource):
    @jwt_required()
    def get(self):
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 10, type=int)

        claims = get_jwt()
        user_id = get_jwt_identity()

        query = Order.query
        if claims.get("role") == "buyer":
            query = query.filter_by(buyer_id=user_id)
        elif claims.get("role") == "farmer":
            query = query.join(Listing).filter(Listing.farmer_id == user_id)

        pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        return {
            "orders": [order.to_dict() for order in pagination.items],
            "total": pagination.total,
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total_pages": pagination.pages,
        }, 200

    @jwt_required()
    def post(self):
        claims = get_jwt()
        if claims.get("role") != "buyer":
            return {"error": "Only buyers can place orders"}, 403

        data = request.get_json()
        listing_id = data.get("listing_id")

        listing = Listing.query.get(listing_id)
        if not listing:
            return {"error": "Listing not found"}, 404

        order = Order(
            buyer_id=get_jwt_identity(),
            listing_id=listing_id,
            price_agreed=data.get("price_agreed"),
            harvest_date=data.get("harvest_date"),
            weight_recorded=data.get("weight_recorded"),
            status=data.get("status", "pending"),
        )
        db.session.add(order)
        db.session.commit()

        return order.to_dict(), 201