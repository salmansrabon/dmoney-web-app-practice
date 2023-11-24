import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with your actual key
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; // Change this value according to your pagination needs
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
  }, [currentPage, token]);

  // Rest of the code remains the same for rendering the user list
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
  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => console.log(`Edit user with ID ${user.id}`)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
