from flask_restful import Resource
from sqlalchemy import func

from models import Listing, Order


class ListingsWithBuyerCount(Resource):
    def get(self):
        results = (
            Listing.query
            .outerjoin(Order, Order.listing_id == Listing.id)
            .add_columns(func.count(Order.id).label("buyer_count"))
            .group_by(Listing.id)
            .all()
        )

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