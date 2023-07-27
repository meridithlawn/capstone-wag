from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import re

from config import app, db, api, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id=db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    breed=db.Column(db.String, nullable=False)
    age= db.Column(db.Integer, nullable=False)
    weight= db.Column(db.Integer, nullable=False)
    fixed = db.Column(db.Boolean, nullable=False)
    profile_pic = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=False)
    currently_walking = db.Column(db.Boolean, default=False)
    handler_id=db.Column(db.Integer, db.ForeignKey('handlers.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    # relationships:
    sent_interactions = db.relationship("Interaction", backref="sender", foreign_keys="Interaction.sender_id", cascade="all")
    received_interactions = db.relationship("Interaction", backref="receiver", foreign_keys="Interaction.receiver_id", cascade="all")
    # returns the users who I reacted to
    users_i_reacted_to = db.relationship('User', secondary='interactions',
        primaryjoin=('User.id == interactions.c.sender_id'),
        secondaryjoin=('User.id == interactions.c.receiver_id'),
        viewonly=True)
    # returns the users who reacted to me
    users_reacted_to_me= db.relationship('User', secondary='interactions',
        primaryjoin=('User.id == interactions.c.receiver_id'),
        secondaryjoin=('User.id == interactions.c.sender_id'),
        viewonly=True)
    #  returns all of my interactions
    def get_user_interactions(self):
        return self.sent_interactions + self.received_interactions
    # returns all neg interaction that I sent
    def get_neg_interactions(self):
        dog_house = [intr.receiver_id for intr in self.sent_interactions if intr.relation_cat == -1]
        return dog_house
    
    def get_users_w_pos_interactions(self):
        friends = []
        for intr in self.get_user_interactions():
            if intr.relation_cat == 1:
                if intr.sender == self:
                    friends.append(intr.receiver.id)
                else:
                    friends.append(intr.sender.id)
        return friends
    
    # returns the reports I sent
    sent_reports = db.relationship("Report", backref="sender", foreign_keys="Report.sender_id", cascade="all")
    # returns the reports I received
    received_reports = db.relationship("Report", backref="receiver", foreign_keys="Report.receiver_id", cascade="all")
    # returns the users I reported
    users_i_reported = db.relationship('User', secondary='reports',
        primaryjoin=('User.id == reports.c.sender_id'),
        secondaryjoin=('User.id == reports.c.receiver_id'),
        viewonly=True    
    )
    # returns the users who reported me
    users_reported_me = db.relationship('User', secondary='reports',
        primaryjoin=('User.id == reports.c.receiver_id'),
        secondaryjoin= ('User.id == reports.c.sender_id'),
        viewonly=True
    )
    
    handler = db.relationship("Handler", back_populates="users")

    serialize_only = ('id', 'username', 'breed', 'age', 'weight', 'fixed', 'profile_pic', 'bio', 'handler_id', 'currently_walking', 'get_users_w_pos_interactions', 'get_neg_interactions', 'sent_interactions.receiver_id', 'users_i_reacted_to.id', 'received_reports')
    serialize_rules = ('-handler.id', '-received_interactions','-users_i_reacted_to', '-users_reacted_to_me', '-sent_reports', '-users_i_reported', '-users-reported-me')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f"User #{self.id}: {self.username}, {self.breed}"
    

class Interaction(db.Model, SerializerMixin):
    __tablename__= 'interactions'

    id=db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    relation_cat = db.Column(db.Integer, nullable=False)
    close_friend = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

# relationships not necessary here because used backref instead of backpopulates in User
    
    def __repr__(self):
        return f"Relation #{self.id}: {self.sender_id}, {self.receiver_id}, {self.relation_cat}"

class Report(db.Model, SerializerMixin):
    __tablename__= 'reports'

    id=db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    concern = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    incident_datetime = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    # relationships should not be necessary because use backref in user
    # serialize
    serialize_only=('id', 'sender_id.id', 'receiver_id.id', 'concern', 'description', 'incident_datetime')

    def __repr__(self):
        return f"Report #{self.id}, {self.sender_id}, {self.receiver_id}, {self.concern}"

class Handler(db.Model, SerializerMixin):
    __tablename__='handlers'

    id=db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    phone = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    # relationships
    users = db.relationship("User", back_populates="handler")

    # serialize
    serialize_only=('id', 'first_name', 'last_name', 'email', 'phone', '-users')

    def __repr__(self):
        return f"Handler #{self.id}: {self.first_name}, {self.last_name}"
    

    # validations
    @validates('username')
    def valid_username(self, key, username):
        if not username or not type(str) or not 2 < len(username) < 20:
          raise ValueError('Your user name must be between 2 and 20 characters long')
        return username
    
    @validates('password')
    def valid_password(self, key, password):
        regex = re.compile(r'^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=.*?[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^])[A-Za-z0-9\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^]{8,60}$')
        if re.fullmatch(regex, password):
            return password        
        return ValueError("Password must contain a capital letter, a number, and a special character")
    
    @validates('age')
    def validate_length(self, key, age):
            if not age or not type(int) or not 0 <= age <= 25:
                raise ValueError('Age must be a number between 0-25')
            return age
    @validates('weight')
    def validate_weight(self, key, weight):
        if not weight or not type(int) or not 1 <= weight <=200:
            raise ValueError('Weight must be a number between 1-200 lbs')
    # @validates('fixed')
    
    @validates('profile_pic')
    def valid_profile_pic(self, key, profile_pic):
        if not profile_pic or not type(str):
            raise ValueError("Invalid picture URL")
        return profile_pic
    
    @validates('first_name')
    def valid_first_name(self, key, name):
        if not name or not type(str) or not 1 < len(name) <30:
            raise ValueError('First name must be between 1-30 characters long')
        return name 
    
    @validates('last_name')
    def valid_last_name(self, key, name):
        if not name or not type(str) or not 1 < len(name) < 30:
            raise ValueError('Last name must be between 1-30 characters long')
        return name
    
    @validates('email')
    def valid_email(self, key, email_address):
        regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+')
        if not re.fullmatch(regex, email_address):
            raise ValueError("Invalid email address")
        if Handler.query.filter_by(email= email_address).first():
            raise ValueError('Email already associated with existing account')
        return email_address
    
    @validates('phone')
    def valid_phone(self, key, phone):
        if not phone or not type(str) or not len(phone) == 10:
            raise ValueError('Please enter your 10 digit USA phone number')
        return phone

    
    

    # to-do: validations, polish up serialize rules and take hash password out