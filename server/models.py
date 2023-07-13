from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import app, db, api, bcrypt
# from app import bcrypt

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id=db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    breed=db.Column(db.String, nullable=False)
    age= db.Column(db.Integer, nullable=False)
    weight= db.Column(db.Integer, nullable=False)
    fixed = db.Column(db.Boolean, nullable=False)
    profile_pic = db.Column(db.String)
    bio = db.Column(db.String)
    handler_id=db.Column(db.Integer, db.ForeignKey('handlers.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    # relationships build similar for reports, excluding the positive and negative
    sent_interactions = db.relationship("Interaction", backref="sender", foreign_keys="Interaction.sender_id")
    received_interactions = db.relationship("Interaction", backref="receiver", foreign_keys="Interaction.receiver_id")
    # users who I reacted to
    users_i_reacted_to = db.relationship('User', secondary='interactions',
        primaryjoin=('User.id == interactions.c.sender_id'),
        secondaryjoin=('User.id == interactions.c.receiver_id'),
        viewonly=True)
    # gives users who reacted to me
    users_reacted_to_me= db.relationship('User', secondary='interactions',
        primaryjoin=('User.id == interactions.c.receiver_id'),
        secondaryjoin=('User.id == interactions.c.sender_id'),
        viewonly=True)
    #  returns all interactions of this user
    def get_user_interactions(self):
        return self.sent_interactions + self.received_interactions
    # returns all neg interaction
    def get_neg_interactions(self):
        # dog_house = [intr for intr in self.get_user_interactions() if intr.relation_cat == -1]
        dog_house = [intr.receiver_id for intr in self.sent_interactions if intr.relation_cat == -1]
        return dog_house
    
    def get_users_w_pos_interactions(self):
        friends = []
        for intr in self.get_user_interactions():
            # should the relation_cat == 0? why is this appending interactions in both ways
            if intr.relation_cat == 1:
                if intr.sender == self:
                    friends.append(intr.receiver.id)
                else:
                # elif intr.receiver == self: elif intr.sender !== self:
                    friends.append(intr.sender.id)
        return friends
    
    # returns the reports I sent
    sent_reports = db.relationship("Report", backref="sender", foreign_keys="Report.sender_id")
    # returns the reports I received
    received_reports = db.relationship("Report", backref="receiver", foreign_keys="Report.receiver_id")
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

    serialize_only = ('id', 'username', 'breed', 'age', 'weight', 'fixed', 'profile_pic', 'bio', 'handler_id', 'get_users_w_pos_interactions', 'get_neg_interactions')
    serialize_rules = ('-handler.id', '-sent_interactions', '-received_interactions', '-users_i_reacted_to', '-users_reacted_to_me' '-sent_reports', '-received_reports', '-users_i_reported', '-users-reported-me')

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

    # relationships 
    # below relationships not necessary because of backref instead of backpopulates so commented out
    # sender= db.relationship("User", back_populates="sent_interactions")
    # receiver= db.relationship("User", back_populates="received_interactions")
    
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
    
    

    # to-do: validations, polish up serialize rules and take hash password out