import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const headerStyle = {
  backgroundColor: '#34db48', /* Background color */
  color: 'white', /* Text color */
  padding: '20px', /* Padding */
  textAlign: 'center',
  fontSize: '24px', /* Font size */
  fontFamily: 'Arial, sans-serif', /* Font family */
  textShadow: '2px 2px 4px #333', /* Text shadow */
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Box shadow */
  background: 'linear-gradient(45deg,  #000080,#3498db  )',
};
  
  const secondaryButton1 = {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '30px 10 0',
    marginLeft:'450 px'
  };
  
  const inputStyle = {
    width: '50%',
    padding: '10px',
    margin:"20px",
    marginBottom: '10px',
    marginLeft:"300px",
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //     border: 'none',
  //     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  //     borderRadius: '10px',
  //     width: '200px',
  //     padding: '20px',
  //   },
  // };
  

const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();

  const handleLogin = () => {
    if (username === 'inno' && password === '123') {
      navigate('/navbar');    }
  };

  return (
    <div>
      <div style={headerStyle}>User Login</div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        style={inputStyle}
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        style={inputStyle}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} style={secondaryButton1}>Login</button>
    </div>
  );
};

export default UserLogin;
