import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(prev => !prev);
    };
  
    return (
      <>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? '✖' : '☰'}
        </button>
  
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <h2>Admin Panel</h2>
          <nav>
            <Link to="/" onClick={toggleSidebar}>Dashboard</Link>
            <Link to="/users" onClick={toggleSidebar}>Users</Link>
            <Link to="/todo" onClick={toggleSidebar}>To-Do</Link>
          </nav>
        </div>
      </>
    );
  };

export default Sidebar



/*


Aap useState ka use kar rahe hain to track karne ke liye whether the sidebar is open (true) or closed (false).
setIsOpen toggle karta hai sidebar ko on every button click.
Ek button render ho raha hai jisme:
☰ icon sidebar open karne ke liye.
✖ icon sidebar band karne ke liye.
Sidebar ke andar ek heading: Admin Panel.
Navigation links:
Dashboard → /
Users → /users
To-Do → /todo
Ye links react-router-dom ke Link component se banaye gaye hain, jo SPA navigation support karte hain.
Har link ke onClick me toggleSidebar() call ho raha hai, jisse sidebar click ke baad automatically close ho jata hai 








*/