import React from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();

  return (
    <div>
      <h2>Edit User</h2>
      <p>UserID from URL: {userId}</p>
      {/* Other content */}
    </div>
  );
};

export default EditUser;
