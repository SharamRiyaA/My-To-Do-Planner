import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddTask from './pages/AddTask';
import ViewTasks from './pages/ViewTasks';
import CompletedTasks from './pages/CompletedTasks';
import './styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          <Link to="/">Add Task</Link>
          <Link to="/view">View Tasks</Link>
          <Link to="/completed">Completed</Link>
        </nav>
        <Routes>
          <Route path="/" element={<AddTask />} />
          <Route path="/view" element={<ViewTasks />} />
          <Route path="/completed" element={<CompletedTasks />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;