from app import ma
from models.profile import Profile


class ProfileSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Profile

    id = ma.auto_field()
    user_id = ma.auto_field()
    phone = ma.auto_field()
    location = ma.auto_field()
    verification_status = ma.auto_field()


profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)