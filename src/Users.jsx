import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser,deleteUser,updateUser } from './redux/UserSlice';
import Sidebar from './Sidebar';
import './App.css'

const Users = () => {
    const users = useSelector(state => state.users.userList);
    const dispatch = useDispatch();
  
    const [formData, setFormData] = useState({
      name: '', email: '', phone: '', role: '', id: null
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.id) {
        dispatch(updateUser(formData)); // Only updates existing user
      } else {
        const { id, ...data } = formData; // Remove null id before addUser
        dispatch(addUser(data));
      }
      setFormData({ name: '', email: '', phone: '', role: '', id: null }); // reset
    };
  
    const handleEdit = (user) => {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        id: user.id
      });
    };
  
  
    return (
        <div className="user-container">
        <Sidebar/>
        <h2>User Management</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
          <input type="text" placeholder="Role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required />
          <button type="submit">{formData.id ? 'Update User' : 'Create User'}</button>
        </form>
    
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="action-btn delete-btn" onClick={() => dispatch(deleteUser(u.id))}>Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="5">No users</td></tr>}
          </tbody>
        </table>
      </div>
    );
}

export default Users



/*

useSelector se users ki list ko Redux store se fetch karte hain.
useDispatch se Redux actions (add, update, delete) ko dispatch karte hain.
Form submit karte waqt agar id hota hai toh existing user update hota hai, nahi toh new user add hota hai.
handleEdit function ke zariye, jab edit button click hota hai, toh selected user ka data form mein fill ho jata hai.





*/