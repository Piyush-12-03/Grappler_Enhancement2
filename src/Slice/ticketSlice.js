import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  tickets: [],
  status: false,
  error: null,
};

export const getTicketsOfUser = (id) => {
  return async (dispatch) => {
    dispatch(fetchUserTicketPending());
    try {
      const response = await axios.get(`http://localhost:8080/tickets/user/${id}`);
      if (response.status === 200) {
        console.log("Ticketsfdfgcgvhgjkhliyuyjfhdgfx",response.data)
        dispatch(fetchUserTicketFulfilled(response.data));
      } else {
        console.error(`Failed to fetch Ticket of User. Server returned status code: ${response.status}`);
        dispatch(fetchUserTicketRejected(`Server returned status code ${response.status}`));
      }
    } catch (error) {
      // Handle network errors and other errors
      console.error("Error fetching Ticket of User:", error);
      dispatch(fetchUserTicketRejected("An error occurred while fetching the ticket."));
    }
  };
};

export const getDropTicketsOfUser=(userId)=>{
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/ticket-drops/${userId}`);
      if (response.status === 200) {
        console.log("Dropped Ticket",response.data)
        dispatch(fetchUserDropTicketFulfilled(response.data));
      } else {
        console.error(`Failed to fetch Ticket of User. Server returned status code: ${response.status}`);
        dispatch(fetchUserDropTicketRejected(`Server returned status code ${response.status}`));
      }
    } catch (error) {
      // Handle network errors and other errors
      console.error("Error fetching Ticket of User:", error);
      dispatch(fetchUserDropTicketRejected("An error occurred while fetching the ticket."));
    }
  };
};

export const getTicketsOfUserByTicketid = (id, ticketId) => {
  // const notifyUser = () => {
  //   // toast(`${userName.toUpperCase()}'s Tickets Fetched`);
  // };
  return async (dispatch) => {
    dispatch(fetchUserTicketPending());
    try {
      const response = await axios.get(`http://localhost:8080/tickets/user/${id}/ticket/${ticketId}`);
      // notifyUser();
      console.log("Get the ticket in list",response.data);
      dispatch(fetchTicketofUserByTicketIdFullfilled(response.data));
    } catch (error) {
      console.log('Error fetching Ticket of User:', error);
      dispatch(fetchUserTicketRejected(error.message));
    }
  };
};
 
export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch(fetchTicketsPending());
    try {
      const response = await axios.get('http://localhost:8080/tickets');
      console.log(response.data);
      dispatch(fetchTicketsFulfilled(response.data));
    } catch (error) {
      console.error("Error fetching projects:", error);
      dispatch(fetchTicketsRejected(error.message));
    }
  };
};

export const addTicket = (newTicketData) => {
  return async (dispatch) => {
    try {
      // You can make a POST request to add a new ticket
      const response = await axios.post('http://localhost:8080/tickets', newTicketData);

      // Dispatch an action to update the state
      dispatch(addTicketFulfilled(response.data));
    } catch (error) {
      // Handle errors
      // console.error("Error adding a ticket:", error);
      dispatch(addTicketRejected(error.message));
    } 
  };
};

// Fetch tickets by project ID
export const fetchTicketsByProject = (projectId) => {
  return async (dispatch) => {
    // console.log(".................");
    dispatch(fetchTicketsPending());
    try {
      const response = await axios.get(`http://localhost:8080/projects/${projectId}/ticket`);
      // console.log("Inside ticket Slice  try.....",response.data);
      dispatch(fetchTicketsFulfilled(response.data.tickets));
    } catch (error) {
      // console.error("Error fetching tickets:", error);
      dispatch(fetchTicketsRejected(error.message));
    }
  };
};

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {

      setTickets: (state, action) => {
        state.userTickets = action.payload;
      },

        fetchTicketsPending: (state) => {
        state.status = true;
      },
      fetchTicketsFulfilled: (state, action) => {
        // console.log(state);
        state.status = false;
        state.tickets = action.payload;
      },
      fetchTicketsRejected: (state, action) => {
        state.status = false;
        state.error = action.payload;
      },
      addTicketPending: (state) => {
        state.status = true;
      },
      addTicketFulfilled: (state, action) => {
        state.status = false;
        state.tickets.push(action.payload); // Assuming the response contains the new ticket
      },
      addTicketRejected: (state, action) => {
        state.status = false;
        state.error = action.payload;
      },
      fetchUserTicketPending: (state) => {
        state.status = true;
      },
      fetchUserTicketFulfilled: (state, action) => {
        // console.log(state);
        state.status = 'succeeded';
        console.log("action: ", action.payload);
        state.tickets = action.payload;
      },
      fetchUserTicketRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      },
      fetchUserDropTicketRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      },

      fetchTicketofUserByTicketIdFullfilled: (state, action) => {
        state.status = 'succeeded';
        console.log("Successs->", state.tickets)
        // Check if the ticket with the same ID already exists in the state
        const isTicketInState = state.tickets.some(ticket => ticket.id === action.payload.id);
      
        if (!isTicketInState) {
          state.tickets.push(action.payload);
          console.log("Action", action.payload);
        } else {
          console.log("Ticket with ID", action.payload.id, "is already in the state. Not adding again.");
        }
      },
      removeUserTicket: (state, action) => {
        const ticketIdToRemove = action.payload;
        state.tickets = state.tickets.filter((ticket) => ticket.id !== ticketIdToRemove);
        state = { ...state, tickets: state.tickets.filter((ticket) => ticket.id !== ticketIdToRemove) };
      },
    },
});
export const {
    fetchTicketsPending,
    fetchTicketsFulfilled,
    fetchTicketsRejected,
    addTicketPending,
  addTicketFulfilled,
  fetchUserDropTicketFulfilled,
  fetchUserDropTicketRejected,
  
  removeUserTicket,
  fetchTicketofUserByTicketIdFullfilled,
  addTicketRejected,fetchUserTicketFulfilled,fetchUserTicketPending,fetchUserTicketRejected
} = ticketsSlice.actions;
export default ticketsSlice.reducer;