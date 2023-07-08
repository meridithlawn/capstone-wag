#!/usr/bin/env python3
# Standard library imports

# Remote library imports
import os
from flask import Flask, request, make_response, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
# Local imports
from config import app, db, api
from models import User, Interaction, Handler, Report

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "SuperSecretKey"
app.json.compact = False

# Define metadata
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

migrate = Migrate(app, db)

# Instantiate REST API
api=Api(app, prefix="/api/v1")
db.init_app(app)

# Instantiate CORS
CORS(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Wag</h1>'

@app.route("/api/v1/check-user", methods=["GET"])
def check_user():
    if id := session.get("user_id"):
        if user := db.session.get(User, id):
            return make_response(user.to_dict(), 200)
    
    return make_response({"error": "Unauthorized"}, 401)



@app.route("/api/v1/signup" , methods=["POST"])
def signup():
    try:
        data = request.get_json()
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(), 201)
    except Exception as e:
        return make_response({"error": str(e) }, 400)

class SignIn(Resource):
    def post(self):

        username = request.get_json()["username"]
        password = request.get_json()["password"]

        user = User.query.filter(User.username == username).first()

        if user:
            # import ipdb; ipdb.set_trace()
            if user.password == password:
                session["user_id"] = user.id
                return user.to_dict(), 200
        return make_response({"error": "Unauthorized"}, 401)
    
api.add_resource(SignIn, "/signin")

class SignOut(Resource):
    def delete(self):
        
        session["user_id"] = None
                
        return make_response({}, 204)
        
api.add_resource(SignOut, "/signout")

class Users(Resource):

    def get(self):
        all_users =[u.to_dict() for u in User.query.all()]
        if all_users:
            return make_response(all_users, 200)
        return make_response("no users found, 404")
    
api.add_resource(Users, "/users")

class UserById(Resource):
    def get(self, id):
        user_by_id = db.session.get(User, id)
        if user_by_id:
            return make_response(user_by_id.to_dict(), 200)
        return make_response(({"error": "404: User with that ID not found"}), 404)
    
    def delete(self, id):
        try:
            user = db.session.get(User, id)
            db.session.delete(user)
            db.session.commit()
            return make_response(({}), 204)
        except Exception as e:
            return make_response(({"error": "404: User not found"}), 404)
        
    def patch(self, id):
        try:
            data = request.get_json()
            user = db.session.get(User, id)
            for k, v in data.items():
                setattr(user, k, v)
            db.session.commit()
            return make_response((user.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}),400)    
        
api.add_resource(UserById, "/users/<int:id>")

class Reports(Resource):
    def get(self):
        all_reports =[r.to_dict() for r in Report.query.all()]
        if all_reports:
            return make_response(all_reports, 200)
        return make_response("no users found, 404")
api.add_resource(Reports, "/reports")


class Handlers(Resource):
    def get(self):
        all_handlers = [h.to_dict() for h in Handler.query.all()]
        if all_handlers:
            return make_response(all_handlers, 200)
        return make_response("no handlers found, 404")
api.add_resource(Handlers, "/handlers")

class HandlerByID(Resource):
    def get(self, id):
        handler_by_id = db.session.get(Handler, id)
        if handler_by_id:
            return make_response(handler_by_id.to_dict(), 200)
        return make_response(({"error": "404: Handler with that ID not found"}), 404)
    
    def patch(self, id):
        try:
            data = request.get_json()
            handler = db.session.get(Handler, id)
            for k, v in data.items():
                setattr(handler, k, v)
            db.session.commit()
            return make_response((handler.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}),400)    
    
    def delete(self, id):
        try:
            handler = db.session.get(Handler, id)
            db.session.delete(handler)
            db.session.commit()
            return make_response(({}), 204)
        except Exception as e:
            return make_response(({"error": "404: User not found"}), 404)

api.add_resource(Handlers, "/handlers/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)