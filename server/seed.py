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


        # handler1 = Handler(first_name= "Meridith", last_name="Lawn", email="meridith@meridith.com", phone="1111111111")
        # handler2 = Handler(first_name= "Matteo", last_name="Puccini", email="matteo@matteo.com", phone="1111111112")
        # handler3 = Handler(first_name= "Historia", last_name="Montague", email="historia@historia.com", phone="1111111113")
        # handler4 = Handler(first_name= "Kevin, last_name="Lumauig", email="kevin@kevin.com", phone="1111111114")
        # handler5 = Handler(first_name= "Jess", last_name="Sommerfield", email="jess@jess.com", phone="1111111115")
        # handler6 = Handler(first_name= "Drew", last_name="Womble", email="drew@drew.com", phone="1111111116")
        # handler7 = Handler(first_name= "Ryan", last_name="Salvato", email="ryan@ryan.com", phone="1111111117")
        # handler8= Handler(first_name= "Ren", last_name="Blake", email= "ren@ren.com", phone="1111111118")
        # handler9= Handler(first_name= "River", last_name="Ferguson", email="river@river.com", phone="1111111119")
        # handler10 = Handler(first_name= "Nolan", last_name="Nash", email="nolan@nolan.com", phone="2111111111")
        # handler11= Handler(first_name= "Shiyao", last_name="Zai", email="shiyao@shiyao.com", phone="31111111111")
        # handler12= Handler(first_name= "Jay", last_name="Lim", email="jay@jay.com", phone="41111111111")
        # handler13= Handler(first_name= "Ashley", last_name="Burnett", email="ashley@ashley.com", phone="51111111111")
        # handler14= Handler(first_name= "Cody", last_name="Cogbill", email="cody@cody.com", phone="61111111111")
        # handler15= Handler(first_name= "Sam", last_name= "Turco", email= "same@sam.com", phone="71111111111")

        # user1 = User(username="Lucas", _password_hash="Lucas!!", breed= "English Cocker Spaniel", age = 7, weight = 26, fixed=True, handler_id=1, bio="Playful, friendly, prefers large dogs" profile_pic="")
        # user2 = User(username="Gnocci",  _password_hash= "Gnocci1!", breed= "Golden Retriever", age = 3, weight = 70, fixed =True, handler_id=2, profile_pic="", bio= "Gets along with everyone")
        # user3 = User(username="Morticia",  _password_hash="Morticia1!", breed= "Border Collie", age = 4, weight = 35, fixed =True, handler_id=3, profile_pic="", bio="I love to bury my toys.")
        # user4 = User(username="Kobe",  _password_hash="Kobe1!", breed= "Lab", age= 10, weight = 60, fixed= False, handler_id=4, profile_pic="", bio="Love to play fetch")
        # user5 = User(username="Sylvia",  _password_hash="Sylvia1!", breed="Mutt", age= 2, weight=30, fixed= True, handler_id=5, profile_pic="", bio="Dramatic")
        # user6 = User(username="Shaggy",  _password_hash="Shaggy1!", breed="English Bulldog", age=9, weight= 30, fixed=False, handler_id=6, profile_pic="", bio="Favorite activity: skateboarding")
        # user7 = User(username= "Honeybun",  _password_hash="Honeybun1!", breed="Shar Pei", age= 5, weight= 60, fixed=False, handler_id=7, profile_pic="", bio="A friend to all")
        # user8 = User(username= "Stimpy",  _password_hash="Stimpy1!", breed= "French Bulldog", age=1, weight=22, fixed=False, handler_id=8, profile_pic="", bio= "Happy! Happy! Happy! Joy! Joy! Joy!")
        # user9 = User(username= "Hendrix",  _password_hash="Hendrix1!", breed="Doberman Pinscher", age=2, weight= 60, fixed=False, handler_id=9, profile_pic="", bio= "Loves water")
        # user10 = User(username= "Macaroni",  _password_hash="Macaroni1!", breed="Italian Greyhound", age=13, weight= 30, fixed=True, handler_id=10, profile_pic="", bio="Prefers to walk slowly and socialize with small dogs")
        # user11 = User(username= "Sandy",  _password_hash="Sandy1!", breed="West Highland Terrier", age = 4, weight = 20, fixed= True, handler_id=11, profile_pic="", bio="Lives in a pineapple, high energy")
        # user12 = User(username = "Arnold",  _password_hash="Arnold1!", breed="German Sheppherd", age = 3, weight= 60, fixed= True, handler_id =12, profile_pic="", bio="Very strong. Socializes with large dogs only")
        # user13 = User(username = "Portia",  _password_hash="Portia1!", breed="Pit Bull", age=12, weight=50, fixed=True, handler_id=13, profile_pic="", bio="Very fast and high energy")
        # user14 = User(username= "Dizzy",  _password_hash="Dizzy1!", breed="Yorkshire Terrier", age 17, weight=10, fixed=True, handler_id=14, profile_pic="", bio="Just likes to sniff around and listen to music")
        # user15 = User(username= "Smash",  _password_hash="Smash1!", breed="Mutt", age=2, weight=40, fixed=True, handler_id=15, profile_pic="", bio="A bull in a china shop, but a friend to all")

        # report1= Report(sender_id = 1, receiver_id= 2, concern = "asdf", description= "asdf")
        # report2= Report(sender_id=2, receiver_id= 1, concern = "asdf2", description= "asdf2")
        # report3= Report(sender_id=3, receiver_id= 1, concern = "asdf3", description= "asdf3")

        # interaction1= Interaction(sender_id = 1, receiver_id= 2, relation_cat= 1)
        # interaction2= Interaction(sender_id = 2, receiver_id= 1, relation_cat= 1)
        # interaction3= Interaction(sender_id = 3, receiver_id= 2, relation_cat= -1)
        


        # db.session.add_all([handler1, handler2, handler3, user1, user2, user3, report1, report2,report3, interaction1, interaction2, interaction3])
        # db.session.commit()
        # print("went through sucessfully")

