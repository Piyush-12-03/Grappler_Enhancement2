import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <button class="nav-item">
            <Link to="/login">Login</Link>
          </button>
        <button class="nav-item">
            <Link to="/allProjects"> All Projects</Link>
          </button>
          
      </div>
    </div>
</nav>
  );
};

export default Dashboard;
