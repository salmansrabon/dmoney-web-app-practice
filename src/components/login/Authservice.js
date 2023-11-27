// AuthService.js

export const checkUserAuthentication = (navigate, initialLoad, userRole) => {
    if (initialLoad) {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
        } else if (token && role === 'Agent' && userRole === 'Agent') {
            navigate('/agent/check-statement');
        } else if (token && role === 'Admin' && userRole === 'Admin') {
            navigate('/admin/check-statement');
        } else {
            navigate('/unauthorized');
        }

        return false;
    }

    return true;
};
