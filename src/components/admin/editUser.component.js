import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { userId } = useParams();
  const token = localStorage.getItem('token');
  const [userDetails, setUserDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    name: '',
    email: '',
    phone_number: '',
    role: ''
  });
  const headers = {
    'Authorization': `${token}`,
    'X-AUTH-SECRET-KEY': 'ROADTOSDET' // Replace 'your_secret_key_here' with your actual secret key
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://dmoney.roadtocareer.net/user/search/id/${userId}`, {
          // Add headers or authorization if required
          headers: headers

        });

        if (response.status === 200) {
          setUserDetails(response.data.user); // Assuming the API returns user details
          setEditedDetails(response.data.user); // Pre-populate editedDetails with fetched user details
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`https://dmoney.roadtocareer.net/user/update/${userId}`, editedDetails, {
        // Add headers or authorization if required
        headers: headers
      });

      if (response.status === 200) {
        const { message } = response.data;
        alert(message); // Show alert with the message from API response
      } else {
        alert('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      alert(error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {userDetails ? (
        <div>
          <p>UserID from URL: {userId}</p>
          {/* Display form with user details for editing */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone_number"
              value={editedDetails.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={editedDetails.role}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleUpdateUser}>Update</button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default EditUser;
