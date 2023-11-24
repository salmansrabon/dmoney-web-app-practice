import { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import AdminDashboard from '../admin/admin.component';
import AgentDashboard from '../agent/agentdashboard.component';
import LoginPage from './login.component';

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { role } = location.state || { role: null };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
        // Check if the token exists in local storage
        const token = localStorage.getItem('token');

        if (token) {
            // If token exists, set isLoggedIn to true
            setIsLoggedIn(true);
        }else {
            // If not logged in, redirect to the login page
            navigate('/login');
        }
    }, []);

    const handleLogout = () => {
        // Perform logout action - clear token and set isLoggedIn to false
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        // Additional actions for logout if needed
        navigate('/login');
    };

    const renderDashboard = () => {
        if (isLoggedIn) {
            switch (localStorage.getItem('role')) {
                case 'Admin':
                    return <AdminDashboard handleLogout={handleLogout} />;
                case 'Agent':
                    return <AgentDashboard handleLogout={handleLogout} />;
                default:
                    return <div>Loading...</div>;
            }
        } else {
            // If not logged in, redirect to login page or display login component
            return <LoginPage />;
        }
    };

    return (
        <div>{renderDashboard()}</div>
    );
}
