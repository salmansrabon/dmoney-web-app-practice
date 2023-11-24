import React from 'react';
import { Link } from 'react-router-dom'; // Assuming the use of React Router

const UnAuthenticated = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Unauthenticated</h1>
      <p style={styles.description}>
        Oops! It looks like you're not authenticated to access this page.
      </p>
      <p style={styles.suggestion}>
        Please <Link to="/login" style={styles.link}>log in</Link> to continue.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '100px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#666',
  },
  suggestion: {
    fontSize: '1rem',
    color: '#444',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default UnAuthenticated;
