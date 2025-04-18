import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router
import AdminDashboard from './AdminDashboard';
import './App.css';
import Users from './Users';
import Todo from './Todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
