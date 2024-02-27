import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('testLogin');
  const [password, setPassword] = useState('testtest1');
  const navigate = useNavigate();

  const styles = {
    body: {
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fff',
    },
    authContainer: {
      maxWidth: '400px',
      width: '100%',
      padding: '20px',
      backgroundColor: '#fff',
      marginTop: '-50px',
      borderRadius: '8px',
    },
    companyLogo: {
      maxWidth: '300px',
      maxHeight: '300px',
      margin: '10px auto',
      display: 'block',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: 'Noto Sans JP, sans-serif',
      color: '#333',
    },
    inputGroup: {
      position: 'relative',
      marginBottom: '25px',
    },
    icon: {
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%)',
      color: '#555',
    },
    input: {
      width: 'calc(100% - 0px)',
      padding: '12px',
      fontSize: '1rem',
      fontFamily: 'Noto Sans JP, sans-serif',
      border: '1px solid #ddd',
      borderRadius: '8px',
      paddingLeft: '35px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    inputHover: {
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    loginBtn: {
      width: '30%',
      padding: '12px',
      fontSize: '1.2rem',
      fontFamily: 'Noto Sans JP, sans-serif',
      backgroundColor: '#000',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      margin: 'auto',
      display: 'block',
    },
    loginBtnHover: {
      backgroundColor: '#333',
      transform: 'scale(1.05)',
    },
  };

  const submitForm = (e) => {
    e.preventDefault();

    // Authentication logic with hardcoded username and password
    const hardcodedUsername = 'testLogin';
    const hardcodedPassword = 'testtest1';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      navigate('/home/new', { replace: true });
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.authContainer}>
        <img src="/bat_black.png" alt="Company Logo" style={styles.companyLogo} />
        <h2 style={styles.heading}>Login </h2>
        <form onSubmit={submitForm}>
          <div style={styles.inputGroup}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} />
            <input
              className='input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              style={{ ...styles.input, ...(username && styles.inputHover) }}
            />
          </div>

          <div style={styles.inputGroup}>
            <FontAwesomeIcon icon={faLock} style={styles.icon} />
            <input
              className='input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ ...styles.input, ...(password && styles.inputHover) }}
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            style={{ ...styles.loginBtn, ...(username && password && styles.loginBtnHover) }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
