import {useState} from "react";

const TaskItem = ({task, onDataUpdate}) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    setCompleted(isChecked);

    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({completed: isChecked}),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      console.log("Todo updated successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update todo");

      // revert back to previous state on API request failure
      setCompleted(!isChecked);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      // update the data shown on the page
      fetch("http://127.0.0.1:5000/tasks")
        .then((response) => response.json())
        .then((data) => {
          onDataUpdate(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete todo");
    }
  };

  const getLabelColor = (color) => {
    switch (color) {
      case "low":
        return "info";
      case "medium":
        return "warning";
      case "high":
        return "danger";
      default:
        return "light";
    }
  };

  return (
    <div className="list-group-item">
      <div className="row py-2">
        <div className="col-1 d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={completed}
            onChange={handleCheckboxChange}
            style={{
              border: "2px solid #588157",
              width: "20px",
              height: "20px",
              marginLeft: "15px",
            }}
          />
        </div>

        <div className="col-3 d-flex align-items-center">
          <p
            className="fw-bolder mb-0"
            style={{color: "#344e41", marginLeft: "10px"}}
          >
            {task.title}
          </p>
        </div>

        <div className="col-6 col-md-5 d-flex align-items-center">
          <p className="mb-0">{task.description}</p>
        </div>

        <div className="col-1 col-md-2  d-flex align-items-center">
          <span className={`badge bg-${getLabelColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <div className="col-1 text-end">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleDelete}
          >
            {/* For time sake, just copied the html for the icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
