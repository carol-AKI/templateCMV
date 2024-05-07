import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://127.0.0.1:8001/api/auth/login/', {
    username: username,
    password: password,
    });
    if (response.status === 200) {
    localStorage.setItem('token', response.data.token);
    onLogin();
    navigate('/vehicles'); 
    }
    } catch (error) {
    if (error.response && error.response.status === 400) {
    alert('Mot de passe est incorrect');
    } else {
    console.log('Error logging in:', error);
    }
    }
    };
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f2f2f2',
        color: 'black',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '600px',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Connexion</h2>
      <form style={{ flex: 1 }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              backgroundColor: '#4caf50',
              color: 'black',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '30px',
            }}
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;