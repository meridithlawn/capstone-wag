from sqlalchemy_serializer import SerializerMixin
from config import db

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id=db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
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
        dog_house = [intr for intr in self.get_user_interactions() if intr.relation_cat == -1]
        return dog_house
    
    # reports I sent
    sent_reports = db.relationship("Report", backref="sender", foreign_keys="Report.sender_id")
    # reports I received
    received_reports = db.relationship("Report", backref="receiver", foreign_keys="Report.receiver_id")
    # users I reported
    reported_users = db.relationship('User', secondary='reports',
        primaryjoin=('User.id == reports.c.sender_id'),
        secondaryjoin=('User.id == reports.c.receiver_id'),
        viewonly=True    
    )

    handler = db.relationship("Handler", back_populates="users")

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

    def __repr__(self):
        return f"Handler #{self.id}: {self.first_name}, {self.last_name}"