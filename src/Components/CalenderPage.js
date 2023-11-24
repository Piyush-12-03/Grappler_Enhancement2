import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { getTicketsOfUser } from '../Slice/ticketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Slice/userSlice';
import Navbar from './Navbar';
import UserCard from './UserCard';

// Import the TicketCard component
import TicketCard from './TicketCard';

const localizer = momentLocalizer(moment);

const secondaryButton = {
  backgroundColor: '#3498db',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

const userCardContainer = {
  marginBottom: '10px', // Add margin-bottom for the user card container
};

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTickets, setUserTickets] = useState([]);
  const { users } = useSelector((state) => state.users);
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      console.log('Fetching users...');
      dispatch(fetchUsers())
        .then((response) => {
          console.log('This is the useEffect of User statement', response);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  }, [dispatch, status]);

  const getTickets = async (id) => {
    if (typeof id === 'number') {
      try {
        const response = await dispatch(getTicketsOfUser(id));
        if (response.payload) {
          const tickets = response.payload;
          console.log('User Tickets:', tickets);
          setUserTickets(tickets);
        } else {
          console.error('Error: Received undefined response');
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };

  const handleUserSelection = (user) => {
    if (user === selectedUser) {
      // If the same user is clicked again, close the card
      setSelectedUser(null);
      setUserTickets([]); // Clear the user's tickets when the card is closed
    } else {
      setSelectedUser(user);
      getTickets(user.id);
    }
  };

  return (
    <>
      <Navbar />
      <div className="CalendarPage">
        <div className="Sidebar">
          <h2>Users</h2>
          <div className="UserList">
            {users.map((user) => (
              <div key={user.id} className="UserCard">
                <button
                  className="btn btn"
                  onClick={() => handleUserSelection(user)}
                >
                  {user.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="Calendar">
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={events}
              defaultDate={new Date()}
              defaultView="month"
              style={{ height: 700 }}
            />
          </div>
        </div>
      </div>
      {/* Display the TicketCard when a user is selected */}
      {selectedUser && (
        <TicketCard user={selectedUser} tickets={userTickets} />
      )}
    </>
  );
};

export default CalendarPage;
