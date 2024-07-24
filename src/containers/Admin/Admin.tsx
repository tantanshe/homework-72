import React from 'react';
import {Link} from 'react-router-dom';

const Admin = () => {
  return (
    <div className="text-center">
      <h1>Admin Panel</h1>
      <nav className="d-flex justify-content-center align-items-center">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link fs-4 px-4 py-2" to={`/admin/dishes`}>Dishes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fs-4 px-4 py-2" to={`/admin/orders`}>Orders</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;