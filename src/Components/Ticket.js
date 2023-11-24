// TimeManagementComponent.js

import React, { useState } from 'react';
import TicketModal from './TicketModal';
import ProjectModal from './ProjectModal';
import { Link } from 'react-router-dom';
import WorklogsModal from './WorklogsModal';

// ... (your styles and other code)

const headerStyle = {
  backgroundColor: '#34db48',
  color: 'white',
  padding: '16px',
  textAlign: 'center',
  fontSize: '24px',
  fontFamily: 'Arial, sans-serif', // You can change the font family
  fontWeight: 'bold', // You can make the text bold
  textShadow: '2px 2px 4px #000000', // You can add a text shadow
  // You can change the text color to a gradient or any other CSS property you prefer
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
  margin: '30px 0 0', // Adjust the top margin (30px) as needed
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
    width: '600px',
    padding: '20px',
  },
};

const Ticket = () => {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [isWorklogsModalOpen, setWorklogsModalOpen] = useState(false);

  const openTicketModal = () => {
    setTicketModalOpen(true);
  };

  const openProjectModal = () => {
    setProjectModalOpen(true);
  };
  const openWorklogsModal = () => {
    setWorklogsModalOpen(true);
  };
  // ... (your render code)

  return (
    <div>
      <div style={headerStyle}>Time Management</div>
      <div style={{ textAlign: 'center' }}>
      {/* Your main component code here */}
      <button style={secondaryButton1} onClick={openTicketModal}>
        Add Ticket
      </button>
      <button style={secondaryButton1} onClick={openProjectModal}>
        Add Project
      </button>
      <button style={secondaryButton1} onClick={openWorklogsModal}>Add Worklogs </button>
      </div>
      {/* ... (other main component content) */}

      <TicketModal
        isOpen={isTicketModalOpen}
        onRequestClose={() => setTicketModalOpen(false)}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onRequestClose={() => setProjectModalOpen(false)}
      />
      <WorklogsModal
        isOpen={isWorklogsModalOpen}
        onRequestClose={() => setWorklogsModalOpen(false)}
      />
    </div>
  );
};

export default Ticket;
