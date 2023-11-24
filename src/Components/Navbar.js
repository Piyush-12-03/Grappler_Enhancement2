import React from 'react';
import { Link } from 'react-router-dom';

const headerStyle = {
  backgroundColor: '#34db48',
  color: 'white',
  padding: '16px',
  textAlign: 'center',
  fontSize: '24px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px #000000',
  background: 'linear-gradient(45deg, #3498db, #000080 )',
};

const Navbar = () => {
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={headerStyle}>
        <div className="container-fluid">
          <div>Time Management</div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          </div>
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto text-end">
  <li className="nav-item">
  <div className="nav-container">
  <Link to="/allProjects" className="nav-link active" aria-current="page">
    Projects
  </Link>
  <Link to="/dragticket" className="nav-link active">
   Calendar
  </Link>
  <Link to="/plan" className="nav-link active">
    Plan
  </Link>
  </div>
  </li>
</ul>
      </nav>
    </div>
  );
};

export default Navbar;
