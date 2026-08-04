from app import ma
from models.listing import Listing


class ListingSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Listing

    id = ma.auto_field()
    farmer_id = ma.auto_field()
    variety = ma.auto_field()
    acreage = ma.auto_field()
    price_per_kg = ma.auto_field()
    status = ma.auto_field()
    farmer_name = ma.Method("get_farmer_name")
    farmer_location = ma.Method("get_farmer_location")

    def get_farmer_name(self, obj):
        return obj.farmer.email if obj.farmer else None

    def get_farmer_location(self, obj):
        return obj.farmer.profile.location if obj.farmer and obj.farmer.profile else None


listing_schema = ListingSchema()
listings_schema = ListingSchema(many=True)