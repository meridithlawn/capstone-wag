#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import User, Handler, Report, Interaction
from config import db




if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        handler1 = Handler(first_name= "Meridith", last_name="Lawn", email="meridithlawn2@gmail.com", phone="8182452341")
        handler2 = Handler(first_name= "Meridith2", last_name="Lawn2", email="meridithlawn22@gmail.com", phone="8182452342")

        user1 = User(username="Lucas", breed = "cocker", age = 7, weight = 25, fixed =True, handler_id=1)
        user2 = User(username="Lucas2", breed = "cocker", age = 7, weight = 25, fixed =True, handler_id=2)

        report1= Report(reporter_id = 1, reportee_id= 2, concern = "asdf", description= "asdf")
        interaction1= Interaction(sender_id = 1, receiver_id= 2, relation_cat= 1)

        db.session.add_all([handler1, handler2, user1, user2, report1, interaction1])
        db.session.commit()
        print("went through sucessfully")

