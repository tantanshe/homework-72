import React from 'react';
import {Link} from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to={`/admin/dishes`}>Dishes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/admin/orders`}>Orders</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;