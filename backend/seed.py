from app import create_app, db
from app.models import Task

app = create_app()

def seed_database():
    # create some example tasks
    tasks = [
        {'title': 'Groceries', 'description': 'We need some food', 'completed': False},
        {'title': 'Gym', 'description': '40 days until vacation...', 'completed': True},
        {'title': 'Target Trip', 'description': 'Need more toothpaste', 'completed': False}
    ]

    # Add tasks to the database
    for task_data in tasks:
        task = Task(**task_data)
        db.session.add(task)
    
    # Commit the changes
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        # Seed the database
        seed_database()
