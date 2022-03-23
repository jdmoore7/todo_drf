import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = (params) => {
    fetch('http://127.0.0.1:8000/api/task-list/')
      .then((response) => response.json())
      .then((list) => {
        setTasks(list);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (e) => {
    // prevent the page from reloading, we only want to make an api request
    e.preventDefault();

    // stop if taskTitle is empty
    if (taskTitle === '') return;
    fetch('http://127.0.0.1:8000/api/task-create/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: null,
        title: taskTitle,
        completed: false,
        pub_date: new Date().toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        fetchTasks();
        setTaskTitle('');
      });
  };

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:8000/api/task-delete/${id}/`, {
      method: 'DELETE',
    }).then((item) => {
      fetchTasks();
    });
  };

  const markComplete = (task, isComplete) => {
    task.completed = isComplete;
    fetch(`http://127.0.0.1:8000/api/task-update/${task.id}/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then((item) => {
      fetchTasks();
    });
  };

  return (
    <div>
      <form style={{ marginLeft: '20px' }}>
        <h2>Add Task</h2>
        <input
          type="text"
          name="todo item"
          value={taskTitle}
          onChange={(event) => {
            setTaskTitle(event.target.value);
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => {
          const { id, completed, title } = task;
          return (
            <li key={id}>
              <h3>
                {title} -- {new Date(task.pub_date).toLocaleString()} --{' '}
                {completed ? '✓ Complete!' : 'Not Complete'}
              </h3>
              {completed && (
                <button
                  onClick={() => {
                    markComplete(task, false);
                  }}
                >
                  MARK INCOMPLETE
                </button>
              )}
              {!completed && (
                <button
                  onClick={() => {
                    markComplete(task, true);
                  }}
                >
                  MARK COMPLETE
                </button>
              )}
              <button
                onClick={() => {
                  deleteTask(id);
                }}
              >
                DELETE
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
