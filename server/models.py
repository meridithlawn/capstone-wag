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

    # relationships
    sent_interactions = db.relationship("Interaction", backref="sender", foreign_keys="Interaction.sender_id")
    received_interactions = db.relationship("Interaction", backref="receiver", foreign_keys="Interaction.receiver_id")
    # reports = db.relationship("Report", back_populates="user")
    sent_reports
    received_reports
    
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
    reporter_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reportee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    concern = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    incident_datetime = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    # relationships bleow lines should not be necessary because use backref in user
    # reporter = db.relationship("User", back_populates="reports")
    # reportee = db.relationship("User", back_populates="reports")

    def __repr__(self):
        return f"Report #{self.id}, {self.reporter_id}, {self.reportee_id}, {self.concern}"

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