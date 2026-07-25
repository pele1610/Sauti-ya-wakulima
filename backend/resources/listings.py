from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from app import db
from models import Listing


class ListingListResource(Resource):
    def get(self):
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 10, type=int)

        pagination = Listing.query.paginate(page=page, per_page=per_page, error_out=False)

        return {
            "listings": [listing.to_dict() for listing in pagination.items],
            "total": pagination.total,
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total_pages": pagination.pages,
        }, 200

    @jwt_required()
    def post(self):
        claims = get_jwt()
        if claims.get("role") != "farmer":
            return {"error": "Only farmers can create listings"}, 403

        data = request.get_json()
        farmer_id = get_jwt_identity()

        listing = Listing(
            farmer_id=farmer_id,
            variety=data.get("variety"),
            tree_count=data.get("tree_count"),
            status=data.get("status", "available"),
        )
        db.session.add(listing)
        db.session.commit()

        return listing.to_dict(), 201



class ListingResource(Resource):
    def get(self, listing_id):
        listing = Listing.query.get(listing_id)
        if not listing:
            return {"error": "Listing not found"}, 404
        return listing.to_dict(), 200

    @jwt_required()
    def put(self, listing_id):
        listing = Listing.query.get(listing_id)
        if not listing:
            return {"error": "Listing not found"}, 404

        user_id = get_jwt_identity()
        if str(listing.farmer_id) != str(user_id):
            return {"error": "You can only edit your own listings"}, 403

        data = request.get_json()
        for field in ["variety", "tree_count", "status"]:
            if field in data:
                setattr(listing, field, data[field])

        db.session.commit()
        return listing.to_dict(), 200

    @jwt_required()
    def delete(self, listing_id):
        listing = Listing.query.get(listing_id)
        if not listing:
            return {"error": "Listing not found"}, 404

        user_id = get_jwt_identity()
        claims = get_jwt()
        if str(listing.farmer_id) != str(user_id) and claims.get("role") != "admin":
            return {"error": "You can only delete your own listings"}, 403

        db.session.delete(listing)
        db.session.commit()
        return {}, 204