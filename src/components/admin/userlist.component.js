import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Default items per page
  const [totalPages, setTotalPages] = useState(0);

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
      <div className="mb-3">
        <label htmlFor="itemsPerPage" className="me-2">Items per page:</label>
        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="form-select form-select-sm w-auto">
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th className="name-column">Name</th> {/* Apply custom class for Name column */}
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
                <td className="wrap-cell" style={{ maxWidth: '200px' }}>{user.name}</td> {/* Set max-width and enable text wrapping */}
                <td className="wrap-cell">{user.email}</td> {/* Enable text wrapping */}
                <td>{user.phone_number}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => console.log(`Edit user with ID ${user.id}`)} className="btn btn-primary me-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-secondary me-2">Previous</button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-secondary ms-2">Next</button>
      </div>
    </div>
  );
};

export default UserList;
