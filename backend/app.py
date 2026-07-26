from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    from models import User, Profile, Listing, Order
    Migrate(app, db)
    CORS(app)

    from flask_jwt_extended import JWTManager
    from flask_restful import Api
    from resources.auth import Register, Login, Protected, AdminOnly
    from resources.listings import ListingListResource, ListingResource
    from resources.orders import OrderListResource, OrderResource
    from resources.analytics import ListingsWithBuyerCount, AvgTreeCountByVariety, OrdersByStatusWithFarmer

    JWTManager(app)

    api = Api(app)
    api.add_resource(Register, "/register")
    api.add_resource(Login, "/login")
    api.add_resource(Protected, "/protected")
    api.add_resource(AdminOnly, "/admin-only")
    api.add_resource(ListingListResource, "/listings")
    api.add_resource(ListingResource, "/listings/<int:listing_id>")
    api.add_resource(OrderListResource, "/orders")
    api.add_resource(OrderResource, "/orders/<int:order_id>")
    api.add_resource(ListingsWithBuyerCount, "/analytics/listings-buyer-count")
    api.add_resource(AvgTreeCountByVariety, "/analytics/avg-tree-count-by-variety")
    api.add_resource(OrdersByStatusWithFarmer, "/analytics/orders-by-status")

    @app.route("/")
    def index():
        return {"message": "Sauti ya Wakulima API is running"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)