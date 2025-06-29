import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
        alt="AI generated computer not found"
        style={styles.image}
      />
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>
        Oops! The page you're looking for doesn't exist. 
        <br />
        We are working on it.

      </p>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: '#f8fafc',
    textAlign: 'center',
  },
  image: {
    maxWidth: '90vw',
    width: '350px',
    height: 'auto',
    marginBottom: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  heading: {
    fontSize: '2.5rem',
    margin: '0 0 1rem 0',
    color: '#22223b',
  },
  text: {
    fontSize: '1.2rem',
    color: '#4a4e69',
  },
};

export default NotFound;
