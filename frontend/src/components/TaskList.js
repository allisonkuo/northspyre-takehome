import TaskItem from "./TaskItem";

const TaskList = ({tasks, onDataUpdate, sortType, sortByType}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;
    sortByType(tasks, value);
  };

  return (
    <div className="container">
      <div className="col d-flex mb-2">
        <div className="col-2 col-sm-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={sortType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Order By
            </option>
            <option value="date">Date Created</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <ul className="list-group" style={{maxHeight: "80vh", overflowY: "auto"}}>
        {tasks.map((task) => {
          return (
            <TaskItem
              task={task}
              onDataUpdate={onDataUpdate}
              key={task.id}
              sortType={sortType}
              sortByType={sortByType}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
