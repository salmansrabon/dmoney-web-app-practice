import React, { useEffect, useState } from 'react';
import { Link, useRoutes, Outlet, useNavigate } from 'react-router-dom';
import CheckStatement from '../statement.component';
import CreateUser from './createuser.component';
import UserList from './userlist.component';
import { checkUserAuthentication } from '../login/Authservice';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);
  const userRole = 'Admin';

  useEffect(() => {
    const isAuthenticated = checkUserAuthentication(navigate, initialLoad, userRole);
    if (!isAuthenticated) {
      setInitialLoad(false);
    }
  }, [navigate, initialLoad, userRole]);

  const handleLogout = () => {
    // Perform logout action - clear token and set isLoggedIn to false
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Additional actions for logout if needed
  };

  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div className="admin-dashboard d-flex">
          {/* Sidebar */}
          <div className="sidebar bg-dark text-light">
            <div className="p-4">
              <h2 className="mb-4">Admin Dashboard</h2>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to="/admin/list-user" className="nav-link text-light">User List</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/create-user" className="nav-link text-light">Create User</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/check-statement" className="nav-link text-light">Check Statement</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-light" onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="main-content flex-grow-1 p-4">
            <Outlet />
            {/* Redirect to check statement component by default */}
          </div>
        </div>
      ),
      children: [
        { path: 'list-user', element: <UserList /> },
        { path: 'create-user', element: <CreateUser /> },
        { path: 'check-statement', element: <CheckStatement /> },
      ],
    },
  ]);

  return routes;
};

export default AdminDashboard;
