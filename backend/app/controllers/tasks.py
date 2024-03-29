from flask import Blueprint, request, jsonify
from app import db
from app.models import Task

tasks_bp = Blueprint('tasks', __name__)

# READ, CREATE
@tasks_bp.route('/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'GET':
        tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    elif request.method == 'POST':
        # Assuming request data contains JSON with task information
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        completed = data.get('completed')

        # Create a new task
        new_task = Task(title=title, description=description, completed=completed)

        # Add the new task to the database session
        db.session.add(new_task)
        db.session.commit()

        return jsonify({'message': 'Task created successfully', 'task_id': new_task.id}), 201

# UPDATE
@tasks_bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    data = request.get_json()
    completed = data.get('completed')

    task.completed = completed
    db.session.commit()

    return jsonify({'message': 'Task updated successfully'}), 200

# DELETE
@tasks_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({'message': 'Task deleted successfully'}), 200