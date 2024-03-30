import json
import pytest
from app import create_app, db
from app.models import Task, PriorityEnum

@pytest.fixture
def app():
    """
    Create a Flask application instance for testing.
    """
    app = create_app()

    # set up configurations for testing
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # use an in-memory SQLite database for testing

    with app.app_context():
        db.create_all()

        # add some dummy data to test db
        task = Task(
            title='Groceries',
            description='I need food.',
            completed=True,
            priority=PriorityEnum.HIGH
        )
        task2 = Task(
            title='Gym',
            description='Vacation is only 20 days away...',
            completed=True,
            priority=PriorityEnum.HIGH
        )

        db.session.add(task)
        db.session.add(task2)
        db.session.commit()

        yield app  # provide the application instance to the tests

        db.session.remove()
        db.drop_all()
        db.create_all() # create the Task table again. pretty sure this is not the right way to handle this...

@pytest.fixture
def client(app):
    """
    Create a test client for making requests to the Flask application.
    """
    return app.test_client()


def test_get_task(client):
    """
    Verify the GET task endpoint returns a list of tasks with all of its columns.
    """
    response = client.get('/tasks')

    assert response.status_code == 200
    data = json.loads(response.data)

    assert isinstance(data, list) # verifying it's a list of tasks
    assert len(data) > 0

    for task in data:
        assert 'id' in task
        assert 'title' in task
        assert 'description' in task
        assert 'completed' in task
        assert 'priority' in task

def test_post_task(client):
    """
    Verify the POST task endpoint creates a new Task.
    """
    new_task_data = {
        'title': 'Gym',
        'description': 'Vacation in 2 months...',
        'completed': False,
        'priority': 'low'
    }

    response = client.post('/tasks', json=new_task_data)

    assert response.status_code == 201
    data = json.loads(response.data)

    assert data['message'] =='Task created successfully'
    assert 'task_id' in data

    # verify data was added to db
    new_task_id = data['task_id']
    new_task = Task.query.get(new_task_id)
    assert new_task is not None
    assert new_task.title == new_task_data['title']
    assert new_task.description == new_task_data['description']
    assert new_task.completed == new_task_data['completed']
    assert new_task.priority == PriorityEnum[new_task_data['priority'].upper()]



def test_put_task(client):
    """
    Verify the PUT task endpoint updates the completed column of the correct Task.
    """
    updated_data = {'completed': True}

    response = client.put(f'/tasks/{1}', json=updated_data)

    assert response.status_code == 200
    data = json.loads(response.data)

    assert data['message'] == 'Task updated successfully'
    updated_task = Task.query.get(1)
    assert updated_task.completed == updated_data['completed']


def test_delete_task(client):
    """
    Verify the DELETE task endpoint removes the speecified Task
    """
    response = client.delete(f'/tasks/{2}')

    assert response.status_code == 200
    data = json.loads(response.data)

    assert data['message'] == 'Task deleted successfully'

    deleted_task = Task.query.get(2)
    assert deleted_task is None
