import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Default items per page
  const [totalPages, setTotalPages] = useState(0);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get('https://dmoney.roadtocareer.net/user/list', {
          headers: {
            Authorization: `${token}`
          }
        });

        if (response.status === 200) {
          setUsers(response.data.users);
          setTotalPages(Math.ceil(response.data.users.length / itemsPerPage));
        } else {
          console.error('Failed to fetch user list');
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    if (token) {
      fetchUserList();
    }
  }, [currentPage, itemsPerPage, token]);
  const handleEditUser = (userId) => {
    setEditUserId(userId); // Set the ID of the user being edited for redirection
  };
  if (editUserId) {
    return <Link to={`/admin/edit-user/${editUserId}`} />;
  }


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setItemsPerPage(selectedValue);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-4">
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
                  <button onClick={() => handleEditUser(user.id)} className="btn btn-primary me-2">
                    Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-secondary me-2">Previous</button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-secondary ms-2">Next</button>
      </div>
    </div>
  );
};

export default UserList;
