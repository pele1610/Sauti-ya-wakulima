from flask_restful import Resource
from flask import request
from sqlalchemy import func

from models import Listing, Order, User


class ListingsWithBuyerCount(Resource):
    def get(self):
        results = (
            Listing.query
            .outerjoin(Order, Order.listing_id == Listing.id)
            .add_columns(func.count(Order.id).label("buyer_count"))
            .group_by(Listing.id)
            .all()
        )

        return [
            {
                "listing_id": listing.id,
                "variety": listing.variety,
                "tree_count": listing.tree_count,
                "status": listing.status,
                "buyer_count": buyer_count,
            }
            for listing, buyer_count in results
        ], 200


class AvgTreeCountByVariety(Resource):
    def get(self):
        results = (
            Listing.query
            .with_entities(Listing.variety, func.avg(Listing.tree_count).label("avg_tree_count"))
            .group_by(Listing.variety)
            .all()
        )

        return [
            {"variety": variety, "avg_tree_count": round(avg_tree_count, 2) if avg_tree_count else 0}
            for variety, avg_tree_count in results
        ], 200


class OrdersByStatusWithFarmer(Resource):
    def get(self):
        status = request.args.get("status", "completed")

        results = (
            Order.query
            .join(Listing, Order.listing_id == Listing.id)
            .join(User, Listing.farmer_id == User.id)
            .filter(Order.status == status)
            .add_columns(User.email.label("farmer_email"))
            .all()
        )

        return [
            {
                "order_id": order.id,
                "status": order.status,
                "price_agreed": order.price_agreed,
                "harvest_date": order.harvest_date.isoformat() if order.harvest_date else None,
                "farmer_email": farmer_email,
            }
            for order, farmer_email in results
        ], 200