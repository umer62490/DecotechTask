import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import './App.css'; // or 'AdminDashboard.css'

const AdminDashboard = () => {
  const users = useSelector(state => state.users.userList);
  const tasks = useSelector(state => state.tasks.taskList);

  const userCount = users.length;
  const taskCount = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-card-container">
          <h1>Welcome to Admin Dashboard</h1>
          <div className="card">
            <h3>👤 User Count: {userCount}</h3>
            <h3>📝 Task Count: {taskCount}</h3>
            <h3>⏳ Pending Tasks: {pendingTasks}</h3>
            <h3>✅ Completed Tasks: {completedTasks}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;




/*

useSelector hook use karke do cheezein fetch kr rhe hain
users from state.users.userList
tasks from state.tasks.taskList


*/