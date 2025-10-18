import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      const sorted = res.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasks(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { completed: true });
      fetchTasks();
      toast.success('✅ Task marked as completed!');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to complete task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('🗑️ Task deleted!');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete task.');
    }
  };

  const groupByDate = tasks.reduce((acc, task) => {
    const dateKey = task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'No Due Date';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {});

  return (
    <div className="container">
      <h2>📋 View Tasks</h2>
      {Object.keys(groupByDate).map(date => (
        <div key={date} className="task-group">
          <h4>Date: {date}</h4>
          <ul>
            {groupByDate[date].map((task) => (
              <li key={task._id}>
                <input
                  type="checkbox"
                  onChange={() => markCompleted(task._id)}
                  title="Mark as completed"
                />
                <span>{task.text}</span>
                {task.dueDate && (
                  <small style={{ marginLeft: '10px', fontStyle: 'italic', color: '#666' }}>
                    ({new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                  </small>
                )}
                <button className="btn small danger" onClick={() => deleteTask(task._id)}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default ViewTasks;
