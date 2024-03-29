import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";

const swap = (arr, i, j) => {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

// for now, sorts highest to lowest
const sortByPriority = (tasks) => {
  var start = 0;
  var end = tasks.length - 1;
  var k = 0; // keep track of the item we're sorting

  while (k <= end) {
    if (tasks[k].priority === "high") {
      swap(tasks, start, k);
      start++;
      k++;
    } else if (tasks[k].priority === "low") {
      swap(tasks, k, end);
      end--;
    } else {
      k++;
    }
  }
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState("");

  // fetch initial data to display
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data); // update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDataUpdate = (updatedData) => {
    setTasks(updatedData);
  };

  // helper method that sorts tasks depending on order type
  const sortByType = (tasks, value) => {
    setSortType(value);

    // sort data depending on order type
    if (value === "date") {
      tasks.sort((a, b) => a.id - b.id);
      setTasks(tasks);
    } else if (value === "priority") {
      sortByPriority(tasks);
      setTasks(tasks);
    }
  };

  return (
    <div
      className="pb-5"
      style={{height: "100vh", backgroundColor: "#e9edc9", overflow: "auto"}}
    >
      <Header />

      <div className="container" style={{width: "60%"}}>
        <div className="row">
          <TaskList
            tasks={tasks}
            onDataUpdate={handleDataUpdate}
            sortType={sortType}
            sortByType={sortByType}
          />
        </div>

        <div className="row mt-4">
          <NewTaskForm
            onDataUpdate={handleDataUpdate}
            sortType={sortType}
            sortByType={sortByType}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
