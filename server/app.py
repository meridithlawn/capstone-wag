#!/usr/bin/env python3
# Standard library imports

# Remote library imports
import os
from flask import Flask, request, make_response, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, or_, and_
from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api, bcrypt
from models import User, Interaction, Handler, Report

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

# app = Flask(__name__) commented out for circular import already in config
# bcrypt = Bcrypt(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

# set up: generate a secret key run in terminal: python -c 'import os; print(os.urandom(16))'
# copy and paste terminal response in place of "SuperSecretKey"
app.secret_key = b"\xe8v\x15\x88\x8b\x92\x0fz\xcd\xe6\x97\x97x\xaa\x89p"
# app.secret_key = "SuperSecretKey"

# Define metadata
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

migrate = Migrate(app, db)

# Instantiate REST API
api = Api(app, prefix="/api/v1")
# db.init_app(app) commented out for circular import already in config

# Instantiate CORS
CORS(app)

# Views go here!


@app.route("/")
def index():
    return "<h1>Wag</h1>"


@app.route("/api/v1/check-user", methods=["GET"])
def authorized():
    if id := session.get("user_id"):
        if user := db.session.get(User, id):
            return make_response(user.to_dict(), 200)

    return make_response({"error": "Unauthorized"}, 401)


@app.route("/api/v1/signup", methods=["POST"])
def signup():
    try:
        user_data = request.get_json().get("user")
        handler_data = request.get_json().get("handler")
        new_handler = Handler(**handler_data)

        db.session.add(new_handler)
        db.session.commit()

        new_user = User(
            username=user_data["username"],
            breed=user_data["breed"],
            age=user_data["age"],
            weight=user_data["weight"],
            fixed=user_data["fixed"],
            profile_pic=user_data["profile_pic"],
            bio=user_data["bio"]
        )
        new_user.handler_id = new_handler.id
        # hashes our password and saves it to _password_hash column
        new_user.password_hash = user_data["password"]
        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(), 201)

    except Exception as e:
        return make_response({"errors": [str(e)]}, 400)


class SignIn(Resource):
    def post(self):
        try:
            user = User.query.filter_by(username=request.get_json()["username"]).first()
            if user and user.authenticate(request.get_json()["password"]):
                session["user_id"] = user.id
                return make_response(user.to_dict(), 200)
            return make_response("Incorrect username or password", 401)
        except Exception as e:
            return make_response("Incorrect username or password", 401)


api.add_resource(SignIn, "/signin")


class SignOut(Resource):
    def delete(self):
        session["user_id"] = None
        return make_response({}, 204)


api.add_resource(SignOut, "/signout")


class Users(Resource):
    def get(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        all_users = [u.to_dict() for u in User.query.all()]
        if all_users:
            return make_response(all_users, 200)
        return make_response("no users found", 404)


api.add_resource(Users, "/users")


class UserById(Resource):
    def get(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        user_by_id = db.session.get(User, id)
        if user_by_id:
            return make_response(user_by_id.to_dict(), 200)
        return make_response(({"error": "404: User with that ID not found"}), 404)

    def delete(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            user = db.session.get(User, id)
            # import ipdb; ipdb.set_trace()
            db.session.delete(user)
            db.session.commit()
            session["user_id"] = None
            return make_response(({}), 204)
        except Exception as e:
            return make_response(({"error": "404: User not found"}), 404)

    def patch(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            data = request.get_json()
            user = db.session.get(User, id)
            for k, v in data.items():
                setattr(user, k, v)
            db.session.commit()
            return make_response((user.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}), 400)


api.add_resource(UserById, "/users/<int:id>")

class UserByIdWalking(Resource):
# the code/patch request as it stands reaches the back end and updates database, but doesnt reflect in data. True in database and false in ipdb value
    def patch(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            data = request.get_json()
            user = db.session.get(User, session["user_id"]) # get current user
            user.currently_walking = False if user.currently_walking else True
            db.session.commit()
            # user.currently_walking = prepares to assign a new value to the property
            # False if user.currently_walking else True python's equivalent to a ternary
            return make_response(user.to_dict(), 200) #or send back nothing, the status code will suffice to toggle state in frontend
        except Exception as e: #what raises an exception in the code above?
            return make_response({"error" : "Unauthorized, you must be logged in!"}, 401)
api.add_resource(UserByIdWalking, "/users/<int:id>/walking")


class Interactions(Resource):
    def get(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        all_interactions = [i.to_dict() for i in Interaction.query.all()]
        if all_interactions:
            return make_response(all_interactions, 200)
        return make_response("no interactions found", 404)

    def post(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            data = request.get_json()
            sender_id = session.get("user_id")
            receiver_id = data["receiver_id"]
            # Check if the interaction already exists in either direction
            existing_interaction = Interaction.query.filter(
                receiver_id == Interaction.sender_id,
                sender_id == Interaction.receiver_id,
            ).first()
            if existing_interaction:
                if existing_interaction.relation_cat == 0:
                    existing_interaction.relation_cat = 1
                    # db.session.add(existing_interaction) not needed, technically a patch here
                    db.session.commit()
                    return make_response(db.session.get(User, sender_id).to_dict(), 200)
                elif existing_interaction.relation_cat == -1:
                    # if you are the sender of the -1, change it to a 0 and they can see you now
                    if existing_interaction.sender_id == sender_id:
                        existing_interaction.relation_cat = 0
                        db.session.commit()
                        return make_response(db.session.get(User, sender_id).to_dict(), 200)
                    return make_response(
                        "category -1 already exists between these users"
                    )
            else:
                new_interaction = Interaction(
                    sender_id=sender_id, receiver_id=receiver_id, relation_cat=0
                )
                db.session.add(new_interaction)
                db.session.commit()
                return make_response(db.session.get(User,sender_id).to_dict(), 201)
        except Exception as e:
            return make_response({"error creating or updating interaction": [str(e)]})

    def put(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            data = request.get_json()
            sender_id = session.get("user_id")
            receiver_id = data["receiver_id"]
            existing_interaction = Interaction.query.filter(
                receiver_id == Interaction.sender_id,
                sender_id == Interaction.receiver_id,
            ).first()
            # import ipdb; ipdb.set_trace()
            if existing_interaction:
                if existing_interaction.relation_cat == 0:
                    # swap sender and receiver to keep track of my rejects
                    existing_interaction.sender_id = sender_id
                    existing_interaction.receiver_id = receiver_id
                    existing_interaction.relation_cat = -1
                    # import ipdb; ipdb.set_trace()
                    db.session.commit()
                    return make_response(db.session.get(User, sender_id).to_dict(), 200)
            else:
                new_interaction = Interaction(
                    sender_id=sender_id, receiver_id=receiver_id, relation_cat=-1
                )
                db.session.add(new_interaction)
                db.session.commit()
                return make_response(db.session.get(User, sender_id).to_dict(), 201)
        except Exception as e:
            return make_response(
                {"error creating or updating interaction": [str(e)]}, 400
            )


api.add_resource(Interactions, "/interactions")


class Reports(Resource):
    def get(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        all_reports = [r.to_dict() for r in Report.query.all()]
        if all_reports:
            return make_response(all_reports, 200)
        return make_response("Reports not found", 404)

    def post(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            data = request.get_json()
            # report = Report(**data)
            report = Report(
                sender_id=data["sender_id"],
                receiver_id=data["receiver_id"],
                concern=data["concern"],
                description=data["description"],
            )
            db.session.add(report)
            db.session.commit()
            return make_response(report.to_dict(), 201)
        except Exception as e:
            return make_response(({"error": str(e)}), 400)


api.add_resource(Reports, "/reports")


class Handlers(Resource):
    def get(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        all_handlers = [h.to_dict() for h in Handler.query.all()]
        if all_handlers:
            return make_response(all_handlers, 200)
        return make_response("Handlers not found", 404)


api.add_resource(Handlers, "/handlers")


class HandlerByID(Resource):
    def get(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        handler_by_id = db.session.get(Handler, id)
        if handler_by_id:
            return make_response(handler_by_id.to_dict(), 200)
        return make_response(({"error": "Handler not found"}), 404)

    def patch(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            data = request.get_json()
            handler = db.session.get(Handler, id)
            for key, value in data.items():
                setattr(handler, key, value)
            db.session.commit()
            return make_response((handler.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}), 400)

    def delete(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            handler = db.session.get(Handler, id)
            db.session.delete(handler)
            db.session.commit()
            return make_response(({}), 204)
        except Exception as e:
            return make_response(({"error": "User not found"}), 404)


api.add_resource(HandlerByID, "/handlers/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
