from enum import Enum
from . import db

class PriorityEnum(Enum):
    HIGH = 'high'
    MEDIUM = 'medium'
    LOW = 'low'

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    completed = db.Column(db.Boolean, default=False)
    priority = db.Column(db.Enum(PriorityEnum), default=PriorityEnum.LOW)

#     # relationship with User model
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(50), unique=True, nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)

#     # relationship with Task model
#     tasks = db.relationship('Task', backref='user', lazy=True)
