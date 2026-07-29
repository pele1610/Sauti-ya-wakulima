from app import ma
from models.listing import Listing


class ListingSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Listing

    id = ma.auto_field()
    farmer_id = ma.auto_field()
    variety = ma.auto_field()
    tree_count = ma.auto_field()
    status = ma.auto_field()


listing_schema = ListingSchema()
listings_schema = ListingSchema(many=True)