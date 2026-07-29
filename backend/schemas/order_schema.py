from app import ma
from models.order import Order


class OrderSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Order

    id = ma.auto_field()
    buyer_id = ma.auto_field()
    listing_id = ma.auto_field()
    price_agreed = ma.auto_field()
    harvest_date = ma.auto_field()
    weight_recorded = ma.auto_field()
    status = ma.auto_field()


order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)