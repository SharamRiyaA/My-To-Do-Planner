import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';
import { toast } from 'react-toastify';

function AddTask() {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const addTask = () => {
    if (!text.trim()) {
      toast.error("Please enter a task!");
      return;
    }

    const fullDate = dueDate && dueTime ? `${dueDate} ${dueTime}` : '';

    axios.post('http://localhost:5000/tasks', {
      text,
      completed: false,
      dueDate: fullDate,
    }).then(() => {
      toast.success("✅ Task Added!");
      setText('');
      setDueDate('');
      setDueTime('');
    }).catch((error) => {
      toast.error("❌ Failed to add task.");
      console.error(error);
    });
  };

  return (
    <div className="container">
      <h2>Add New Task</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Task Description" className="input" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input" />
      <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} className="input" />
      <button onClick={addTask} className="btn">Add Task</button>
    </div>
  );
}

export default AddTask;