import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchCompletedTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks/all');
      const completed = res.data.filter(task => task.completed);
      const sorted = completed.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasks(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const grouped = tasks.reduce((acc, task) => {
    const dateKey = task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'No Due Date';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {});

  return (
    <div className="container">
      <h2>✅ Completed Tasks</h2>
      {Object.keys(grouped).map(date => (
        <div key={date} className="task-group">
          <h4>Date: {date}</h4>
          <ul>
            {grouped[date].map(task => (
              <li key={task._id}>{task.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CompletedTasks;
