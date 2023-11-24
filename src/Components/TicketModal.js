import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addTicket } from '../Slice/ticketSlice';

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const secondaryButton = {
  backgroundColor: '#009688',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
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
    width: '600px',
    padding: '20px',
  },
};
Modal.setAppElement('#root');

const TicketModal = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState({
    ticket_id: '',
    title: '',
    description: '',
    estimated_time: '',
    priority: 'Medium',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const handleAddTicket = (newTicketData) => {
    dispatch(addTicket(newTicketData));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Ticket Modal"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Ticket Details</h2>

      <form onSubmit={handleAddTicket}>
        <div className="form-group">
          <label style={inputLabelStyle} htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange} 
             style={inputStyle}

            required
          />
        </div>

        <div className="form-group">
          <label style={inputLabelStyle} htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div className="form-group">
          <label style={inputLabelStyle} htmlFor="estimated_time">Estimated Time:</label>
          <input
            type="text"
            className="form-control"
            name="estimated_time"
            value={formData.estimated_time}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div className="form-group">
          <label style={inputLabelStyle} htmlFor="priority">Priority:</label>
          <select
            className="form-control"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            style={inputStyle}

          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label style={inputLabelStyle} htmlFor="startDate">Start Date:</label>
          <input
            type="datetime-local"
            className="form-control"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            style={inputStyle}

            required
          />
        </div>

        <div className="form-group">
          <label style={inputLabelStyle} htmlFor="endDate">End Date:</label>
          <input
            type="datetime-local"
            className="form-control"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}  style={inputStyle}

            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={secondaryButton}>
          Save
        </button>
      </form>
    </Modal>
  );
};

export default TicketModal;
