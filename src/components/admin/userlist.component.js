import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Pagination from '../pagination.component';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Default items per page
  const [totalPages, setTotalPages] = useState(0);
  const [editUserId, setEditUserId] = useState(null);
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: ''
  });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://dmoney.roadtocareer.net/user/list', {
          headers: {
            Authorization: `${token}`
          }
        });

        if (response.status === 200) {
          setUsers(response.data.users);
          setTotalCount(response.data.users.length);
          setTotalPages(Math.ceil(response.data.users.length / itemsPerPage));
        } else {
          console.error('Failed to fetch user list');
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
        if (error.response && error.response.status === 403 && error.response.data.error.message === 'Token expired!') {
          // Redirect to login page if token is expired
          navigate('/login');
        }
      } finally {
        // Set loading to false when fetching completes (whether successful or not)
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUserList();
    }
  }, [currentPage, itemsPerPage, token]);
  const handleEditUser = (userId) => {
    setEditUserId(userId);
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleItemsPerPageChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setItemsPerPage(selectedValue);
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };
  const filterUsers = (user) => {
    const { name, email, phone_number, role } = user;
    const { name: nameQuery, email: emailQuery, phoneNumber: phoneQuery, role: roleQuery } = searchQuery;

    return (
      name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      email.toLowerCase().includes(emailQuery.toLowerCase()) &&
      phone_number.includes(phoneQuery) &&
      role.toLowerCase().includes(roleQuery.toLowerCase())
    );
  };
  const handleDeleteUser = async (userId) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this user?');

    if (confirmDeletion) {
      try {
        const response = await axios.delete(`https://dmoney.roadtocareer.net/user/delete/${userId}`, {
          headers: {
            Authorization: `${token}`,
            'X-AUTH-SECRET-KEY': 'ROADTOSDET'
          }
        });

        if (response.status === 200) {
          // Filter out the deleted user from the list
          const updatedUsers = users.filter(user => user.id !== userId);
          setUsers(updatedUsers);
          setTotalCount(updatedUsers.length)
          alert('User deleted successfully!');
        } else {
          if (response.status >= 400 && response.status < 600) {
            alert('Failed to delete user. Error: ' + response.data.message);
          } else {
            alert('Failed to delete user. Unexpected error occurred.');
          }
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Error: ' + error.message);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedUsers = users.filter(filterUsers).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-4">
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          {/* Replace 'loader.gif' with your loader image file */}
          <img src='/images/loader.gif' width={120} height={120} alt="Loading..." />
        </div>
      )}

      {!isLoading && (
        <>
          <h2>User List</h2>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="itemsPerPage" className="me-2">Items per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="form-select form-select-sm w-auto"
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>
            <div>
              <span>Total Users: {totalCount}</span>
            </div>
          </div>
          <div className="mb-3 row g-3">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                value={searchQuery.name}
                onChange={handleSearch}
                placeholder="Search by name"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="email"
                value={searchQuery.email}
                onChange={handleSearch}
                placeholder="Search by email"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="phoneNumber"
                value={searchQuery.phoneNumber}
                onChange={handleSearch}
                placeholder="Search by phone number"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="role"
                value={searchQuery.role}
                onChange={handleSearch}
                placeholder="Search by role"
                className="form-control"
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th className="name-column">Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {displayedUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="wrap-cell" style={{ maxWidth: '200px' }}>{user.name}</td>
                    <td className="wrap-cell">{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="btn btn-primary me-2"
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

    </div>
  );
};

export default UserList;
