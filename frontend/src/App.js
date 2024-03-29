import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data); // update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDataUpdate = (updatedData) => {
    setTasks(updatedData);
  };

  return (
    <div
      className="pb-5"
      style={{height: "100vh", backgroundColor: "#e9edc9", overflow: "auto"}}
    >
      <Header />

      <div className="container" style={{width: "60%"}}>
        <div className="row" style={{maxHeight: "50vh", overflowY: "auto"}}>
          <TaskList tasks={tasks} onDataUpdate={handleDataUpdate} />
        </div>

        <div className="row mt-4">
          <NewTaskForm onDataUpdate={handleDataUpdate} />
        </div>
      </div>
    </div>
  );
}

export default App;
