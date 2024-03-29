import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDataUpdate }) => {
    return (
        <div className='container'>
            <div className="list-group">
                {tasks.map((task) => {
                    return <TaskItem task={task} onDataUpdate={onDataUpdate} key={task.id} />
                })}
            </div>

        </div>
    );
}

export default TaskList;