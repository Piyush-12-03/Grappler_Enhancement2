  import React, { useState } from 'react';
  import Modal from 'react-modal';
  import { useDispatch } from 'react-redux';
  import { addWorklogToBackend } from '../Slice/WorklogSlice';
  import { useParams } from 'react-router-dom';

  // Styling for buttons and form elements
  const buttonStyle = {
    backgroundColor: '#009688',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const inputLabelStyle = {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
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
      width: '400px', // Adjust the width as needed
      padding: '20px',
    },
  };

  Modal.setAppElement('#root'); // Or replace '#root' with the appropriate element ID

  const WorklogsModal = ({ isOpen, onRequestClose,ticketId1 }) => {
    console.log(ticketId1)
    const dispatch = useDispatch();
    const { ticketId } = useParams(); // Fetch ticketId from URL params
  console.log("aaaaaaadddd",ticketId)
    const [formData, setFormData] = useState({
      log_id: '',
      date: '', // Use an appropriate date input component
      duration: '',
      end_time: '2023-10-23T15:52:36',  // Use an appropriate time input component
      start_time: '', // Use an appropriate time input component
      projects_project_id: '',
      tickets_ticket_id: ticketId, // Pass the ticketId from URL params
      users_user_id: '',
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addWorklogToBackend(formData))
        .then(() => {
          onRequestClose(); // Close the modal on success
        })
        .catch((error) => {
          console.error('Error adding worklog:', error);
          // Handle the error if needed
        });
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Worklogs Modal"
      >
        <h2>Add Worklog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={inputLabelStyle}>Date:</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={inputLabelStyle}>Duration:</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={inputLabelStyle}>Start Time:</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={inputLabelStyle}>End Time:</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>Add Worklog</button>
        </form>
      </Modal>
    );
  };

  export default WorklogsModal;
