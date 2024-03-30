from app.models import Task, PriorityEnum

# def mock_task():
#     return

def test_create_task():
    """
    Test that the columns are all defined correctly when a new Task is created.
    """
    mock_task = Task(
        title='Groceries',
        description='I need food.',
        completed=True,
        priority=PriorityEnum.HIGH
    )
    assert mock_task.title == 'Groceries'
    assert mock_task.description == 'I need food.'
    assert mock_task.completed
    assert mock_task.priority == PriorityEnum.HIGH

def test_default_values():
    """
    Test that default values for Task are saved correctly
    """
    default_task = Task(
        title='Groceries',
        description='I need food.',
        priority=PriorityEnum.LOW

    )
    assert default_task.title == 'Groceries'
    assert default_task.description == 'I need food.'
    assert not default_task.completed
    assert default_task.priority == PriorityEnum.LOW
