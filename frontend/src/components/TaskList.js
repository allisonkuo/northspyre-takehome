import TaskItem from "./TaskItem";

const TaskList = ({tasks, onDataUpdate}) => {
  return (
    <div className="container">
      <ul className="list-group">
        {tasks.map((task) => {
          return (
            <TaskItem task={task} onDataUpdate={onDataUpdate} key={task.id} />
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
