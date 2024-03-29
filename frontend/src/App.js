import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import React, { useEffect, useState } from 'react';
import NewTaskForm from './components/NewTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data); // update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDataUpdate = (updatedData) => {
    setTasks(updatedData);
  };

  return (
    <html>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

      <div className='py-5' style={{ height: '100vh', backgroundColor: '#a8dadc' }}>
        <div className='container' style={{ width: '60%' }}>
          <div className='row mt-4' style={{ paddingBottom: '40px' }}>
            <h1 className='fw-bolder' style={{ color: '#457b9d' }}>
              The Fellowship of the Errands
            </h1>
          </div>

          <div className='row' style={{ height: '60vh', overflowY: 'auto' }}>
            <TaskList tasks={tasks} onDataUpdate={handleDataUpdate} />
          </div>

          <div className='row mt-3'>
            <NewTaskForm onDataUpdate={handleDataUpdate} />
          </div>

        </div>
      </div >
    </html>

  );
}

export default App;
