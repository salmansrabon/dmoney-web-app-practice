import React, {useEffect, useState} from 'react';
import { Link, useRoutes, Outlet, useNavigate } from 'react-router-dom';
import CheckStatement from '../statement.component';
import CreateUser from './createuser.component';
import UserList from './userlist.component';



const AdminDashboard = () => {
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (initialLoad) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token) {
        navigate('/login'); // Redirect to login if no token is found
      } else if(token && role== 'Admin'){
        navigate('/admin/check-statement');
      }
      else{
        navigate('/unauthorized');
      }
      setInitialLoad(false);
    }
  }, [navigate, initialLoad]);

  const handleLogout = () => {
    // Perform logout action - clear token and set isLoggedIn to false
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    // Additional actions for logout if needed
  };
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
              <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/admin/list-user" className="nav-link">User List</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/create-user" className="nav-link">Create User</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/check-statement" className="nav-link">Check Statement</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={handleLogout}>Logout</Link>
                  </li>
                  

                </ul>
              </div>
            </div>

            {/* Main content */}
            <div className="col-md-9">
              <div className="main-content">
                <Outlet />
                {/* redirect to check statement component default */}

              </div>
            </div>
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
