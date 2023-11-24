// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProjects from './Components/AllProjects';
import AdminLogin from './Components/AdminLogin';
import AllTickets from './Components/AllTickets';
import Navbar from './Components/Navbar';
import UserLogin from './Components/UserLogin'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import AllWorklogs from './Components/AllWorklogs';
import WorklogForm from './Components/WorklogForm';
import './App.css';
import DragTicket from './Components/DragTicket';
import Plan from './Components/Plan';

function App() {
  return (
      <Routes>
        <Route index element={< UserLogin/>} />
        <Route path="navbar" element={<Navbar />}/>
        <Route path="allProjects" element={<AllProjects />} />
        <Route path="/allTickets/:projectId" element={<AllTickets/>} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="/worklog/:ticketId" element={<AllWorklogs/>}/>
        <Route path="/ticket/:ticketId" element={<WorklogForm/>}/>
        <Route path="/dragticket" element={<DragTicket/>}/>
        <Route path="/plan" element={<Plan/>}/>


      </Routes>
  );
}

export default App;
