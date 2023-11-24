
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

const secondaryButton = {
    backgroundColor: '#009688',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none', 
    cursor: 'pointer',
    fontSize: '16px',
  };
  
  const secondaryButton1 = {
    backgroundColor: '#34495e',
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
      width: '600px',
      padding: '20px',
    },
  };
  Modal.setAppElement('#root'); // Or replace '#root' with the appropriate element ID


const ProjectModal = ({ isOpen, onRequestClose }) => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16); // Format as "yyyy-MM-ddTHH:mm"
    const currentDate1 = new Date();
    const formattedDate1 = currentDate1.toISOString().slice(0, 16);
  const [formData, setFormData] = useState({
    project_id: '',      // Add project_id field
    description: '',     // Add description field
    start_date: new Date(), // Set to the current date and time
  end_date: new Date(), 
    name: '',            // Add name field
    // Add other form fields here
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is a date field
    if (name === 'start_date' || name === 'end_date') {
      const dateValue = new Date(value);
  
      if (!isNaN(dateValue)) {
        setFormData({
          ...formData,
          [name]: dateValue,
        });
      } else {
        console.error(`Invalid date input for ${name}: ${value}`);
      }
    } else {
      // For non-date fields, directly update the state
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  }
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Project Modal"
    >
      <h2 style={{ textAlign: 'center' }}>Add Project</h2>

      <form>

<label style={inputLabelStyle}>Name:</label>
<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleInputChange}
  style={inputStyle}
  required
/>

<label style={inputLabelStyle}>Description:</label>
<input
  type="text"
  name="description"
  value={formData.description}
  onChange={handleInputChange}
  style={inputStyle}
  required
/>

<label style={inputLabelStyle}>Start Date and Time:</label>
<input
  type="datetime-local"
  name="start_date"
  value={formattedDate}
  onChange={handleInputChange}
  style={inputStyle}
/>


<label style={inputLabelStyle}>End Date and Time:</label>
<input
  type="datetime-local"
  name="end_date"
  value={formattedDate1}
  onChange={handleInputChange}
  style={inputStyle}
/>



        {/* Add other form fields here if needed */}

        <button type="submit" style={secondaryButton}>
          Add
        </button>
      </form>
    </Modal>
  );
};

export default ProjectModal;
