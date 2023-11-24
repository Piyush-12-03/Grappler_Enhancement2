import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorklogs } from '../Slice/WorklogSlice';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headerStyle = {
  backgroundColor: '#34db48',
  color: 'white',
  padding: '20px',
  textAlign: 'center',
  fontSize: '24px',
  fontFamily: 'Arial, sans-serif',
  textShadow: '2px 2px 4px #333',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(45deg, #000080, #3498db)',
};

const pageStyle = {
  backgroundColor: '#ADD8E6',
};

const tableStyle = {
  backgroundColor: '#ADD8E6',
  fontSize: '12px',
};

const AllWorklogs = () => {
  const dispatch = useDispatch();
  const { worklogs, status, error } = useSelector((state) => state.worklogs);
  const { ticketId } = useParams();

  useEffect(() => {
    dispatch(fetchWorklogs(ticketId));
  }, [dispatch]);

  function formatDateTime(dateTimeString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      <h1 className="allprojects" style={headerStyle}>
        Worklogs
      </h1>
      {status === 'loading' && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    
      {status === 'failed' && worklogs.length === 0 && (
        <>
          <div>
            <center>
            <h1>No worklogs found</h1>
        </center></div>
          <ToastContainer autoClose={3000} position="top-center" />
        </>
      )}
      {status === 'succeeded' && worklogs.length > 0 && (
        <table className="table table-hover" style={{ ...tableStyle, fontSize: '12px' }}>
          <thead>
            <tr>
              <th>Worklog ID</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration (in minutes)</th>
            </tr>
          </thead>
          <tbody>
            {worklogs.map((worklog) => (
              <tr key={worklog.log_id}>
                <td>{worklog.log_id}</td>
                <td>{formatDateTime(worklog.date)}</td>
                <td>{formatDateTime(worklog.start_time)}</td>
                <td>{formatDateTime(worklog.end_time)}</td>
                <td>{worklog.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllWorklogs;
