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
