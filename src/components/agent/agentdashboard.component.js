import React from 'react';
import { Link, useRoutes, Outlet } from 'react-router-dom';
import Deposit from './deposit.component';
import Payment from './payment.component';
import CheckStatement from '../statement.component';
import CheckBalance from '../balance.component';

const AgentDashboard = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
  }
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
              <div className="sidebar">
                <h2>Agent Dashboard</h2>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/agent/deposit" className="nav-link">Deposit</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/agent/payment" className="nav-link">Payment</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/agent/check-statement" className="nav-link">Check Statement</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/agent/check-balance" className="nav-link">Check Balance</Link>
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
        { path: 'deposit', element: <Deposit /> },
        { path: 'payment', element: <Payment /> },
        { path: 'check-statement', element: <CheckStatement /> },
        { path: 'check-balance', element: <CheckBalance /> },
      ],
    },
  ]);

  return routes;
};


export default AgentDashboard;
