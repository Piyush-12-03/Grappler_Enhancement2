import React, { useState } from 'react';

const headerStyle = {
    backgroundColor: '#34db48',
    color: 'white',
    padding: '16px',
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif', // You can change the font family
    fontWeight: 'bold', // You can make the text bold
    textShadow: '2px 2px 4px #000000', 
    background: 'linear-gradient(45deg, #3498db, #db4934)',
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
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      width: '200px',
      padding: '20px',
    },
  };
  

const AdminLogin = ({ onLogin }) => {
  const [adminname, setAdminname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (adminname === 'admin' && password === '963') {
      onLogin();
    }
  };

  return (
    <div>
      <div style={headerStyle}>Admin Login</div>
      <input
        type="text"
        placeholder="Adminname"
        value={adminname}
        style={inputStyle}
        onChange={(e) => setAdminname(e.target.value)}
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

export default AdminLogin;
