/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTicketsByProject } from "../Slice/ticketSlice";
import WorklogsModal from "./WorklogsModal";
import TicketModal from "./TicketModal";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";

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

const AllTickets = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const status = useSelector((state) => state.tickets.status);
  const { projectId } = useParams();
// console.log(projectId)
  // console.log(tickets)
  useEffect(() => {
    if (projectId) {
      // Fetch tickets by project if projectId is available
      // if (status === "idle") {
        console.log("ticket")
        dispatch(fetchTicketsByProject(projectId));
    //   }
    // } else {
    //   // Handle the case when no projectId is available
    //   // You can fetch all tickets or implement your logic here
    // }
}}, []);

function formatDateTime(dateTimeString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [draggedTicket, setDraggedTicket] = useState(null);

  const handleDragStart = (e, ticket) => {
    // Store the card's data
    setDraggedTicket(ticket);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, ticket) => {
    e.preventDefault();
    if (draggedTicket) {
      // Implement your drag and drop logic here
    }
    console.log(tickets)
  };

  return (
    <div className="ticket-bg">
      <Navbar />
      <h1 className="allprojects" style={headerStyle}>All Tickets</h1>
      {status === true && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

        <div>
          <div className="row">
            {tickets.map((ticket) => (
              <div key={ticket.ticketId} className="col-lg-3 mb-4">
                <div style={{ maxWidth: "20rem" }}>
                  <div
                    className="card-container" 
                  style={{backgroundColor:"#5cbcda"}}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, ticket)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, ticket)}
                  >
                    <div className="card text-bg mb-4" style={{ maxWidth: "20rem" }}>
                      <div className="card-header" >Ticket ID: {ticket.ticketId}</div>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{ticket.title}</h5>
                          <p className="card-text">{ticket.description}</p>
                          <p className="card-text">Start Time: {formatDateTime(ticket.start_time)}</p>
                          <p className="card-text">End Time: {formatDateTime(ticket.end_time)}</p>
                        <Link to={`/ticket/${ticket.ticketId}`} className="btn btn-success btn-zoom">Add Worklogs</Link>
                            <Link to={`/worklog/${ticket.ticketId}`} style={{ marginLeft: "10px" }} className="btn btn-warning">View Worklogs</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    
      {isModalOpen && (
        <WorklogsModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} />
      )}

      {isTicketModalOpen && (
        <TicketModal isOpen={isTicketModalOpen} onRequestClose={() => setTicketModalOpen(false)} />
      )}
    </div>
  );
};

export default AllTickets;
