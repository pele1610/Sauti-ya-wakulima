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