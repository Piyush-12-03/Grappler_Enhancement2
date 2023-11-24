import React from 'react';

const TicketCard = ({ user, tickets }) => {
  return (
    <div className="TicketCard">
      <h3>Ticket Information for {user.name}</h3>
      <ul>
        {Array.isArray(tickets) && tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li key={ticket.id}>
              <strong>Ticket ID:</strong> {ticket.id}
              <br />
              <strong>Description:</strong> {ticket.description}
              {/* Add more ticket details here */}
            </li>
          ))
        ) : (
          <li>No tickets found for {user.name}</li>
        )}
      </ul>
    </div>
  );
};

export default TicketCard;
