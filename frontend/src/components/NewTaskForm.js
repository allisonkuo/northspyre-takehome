import {useState} from "react";

const NewTaskForm = ({onDataUpdate}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    // update formData with input data
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        formData.title === "" ||
        formData.description === "" ||
        formData.priority === "" ||
        !formData.hasOwnProperty("priority")
      ) {
        return;
      }

      console.log(formData);

      const response = await fetch(`http://127.0.0.1:5000/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      console.log("Todo created successfully");
      // reset the form so you can add in a new task
      setFormData({title: "", description: ""});

      // update the data shown on the page
      fetch("http://127.0.0.1:5000/tasks")
        .then((response) => response.json())
        .then((data) => {
          onDataUpdate(data); // update state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create todo");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="row pt-3 rounded pb-2"
          style={{border: "1px solid #588157"}}
        >
          <div className="col-2">
            <p
              className="pt-2 fw-bolder"
              style={{color: "#588157", marginLeft: "10px"}}
            >
              ADD TASK
            </p>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              aria-label="Task Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              aria-label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              aria-label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-secondary">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewTaskForm;
