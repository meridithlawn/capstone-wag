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
        handler3 = Handler(first_name= "Meridith3", last_name="Lawn3", email="meridithlawn23@gmail.com", phone="8182452343")

        user1 = User(username="Lucas", breed = "cocker", age = 7, weight = 25, fixed =True, handler_id=1)
        user2 = User(username="Lucas2", breed = "cocker", age = 7, weight = 25, fixed =True, handler_id=2)
        user3 = User(username="Lucas3", breed = "cocker", age = 7, weight = 25, fixed =True, handler_id=3)

        report1= Report(sender_id = 1, receiver_id= 2, concern = "asdf", description= "asdf")
        report2= Report(sender_id=2, receiver_id= 1, concern = "asdf2", description= "asdf2")
        report3= Report(sender_id=3, receiver_id= 1, concern = "asdf3", description= "asdf3")

        interaction1= Interaction(sender_id = 1, receiver_id= 2, relation_cat= 1)
        interaction2= Interaction(sender_id = 2, receiver_id= 1, relation_cat= 1)
        interaction3= Interaction(sender_id = 3, receiver_id= 2, relation_cat= -1)
        


        db.session.add_all([handler1, handler2, handler3, user1, user2, user3, report1, report2,report3, interaction1, interaction2, interaction3])
        db.session.commit()
        print("went through sucessfully")

