import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  userTickets: [],
  status: 'idle',
  error: null,
};

const userTicketSlice = createSlice({
  name: 'userTicket',
  initialState,
  reducers: {
    createUserTicketStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    createUserTicketSuccess: (state, action) => {
      state.status = 'succeeded';
      state.userTickets.push(action.payload);
    },
    createUserTicketFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateExistingTicketstart: (state)=>{
      state.status = 'loading';
      state.error = null;
    },
    updateExistingTicketSuccess: (state, action) => {
      state.status = 'succeeded';
      state.userTickets.push(action.payload);
    },
    updateExistingTicketFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteUTStart: (state)=>{
        state.status = 'loading';
        state.error = null;
      },
      deleteUTSuccess:(state, action)=>{
        state.status = 'succeeded';
        state.userTickets.push(action.payload);
      },
      deleteUTFailure:(state, action)=>{
        state.status='failed';
        state.error = action.payload;
      },
      
  },
});

export const {
  createUserTicketStart,
  createUserTicketSuccess,
  createUserTicketFailure,
  getUserTicketStart,
  getUserTicketSuccess,
  getUserTicketFailure,
  updateExistingTicketstart,
  updateExistingTicketFailure,
  updateExistingTicketSuccess,
  deleteUTStart,
  deleteUTSuccess,
  deleteUTFailure
} = userTicketSlice.actions;

  
export const createUserTicket = (userTicketData) => async (dispatch) => {
  dispatch(createUserTicketStart());
  try {
    const response = await axios.post(`http://localhost:8080/api/ticket-drops/`, userTicketData);
    dispatch(createUserTicketSuccess(response.data));
    // fetchUserTicket(userTicketData);
    console.log("API Hit successfully---------1", response.data)
  } catch (error) {
    dispatch(createUserTicketFailure(error.message));
  }
};

export const fetchUserTicket = () => async (dispatch) => {
 
  dispatch(getUserTicketStart());
  try {
    // console.log("added successfully   2")
    const response = await axios.post(`http://localhost:8080/api/ticket-drops`);
    dispatch(getUserTicketSuccess(response.data));
  } catch (error) {
    // Dispatch the failure action with the error message
    dispatch(getUserTicketFailure(error.message));
  }
};

export const updateExistingTicket = (userTicketData,userId,ticketId) => async(dispatch)=>{
  console.log("Inside Update", userTicketData, userId, ticketId);
  dispatch(updateExistingTicketstart());
  try{
    const response = await axios.put(`http://localhost:8080/api/ticket-drops/${userId}/${ticketId}`,userTicketData);
    console.log("Update API Hit Success")
    dispatch(updateExistingTicketSuccess(response.data));
  }
  catch(error){
    dispatch(updateExistingTicketFailure(error.message));
}
};

export const deleteUserTicket = (userId,ticketId)=>async (dispatch)=>{
  console.log("Piyush")
  // dispatch(deleteUTStart());
  try{
    console.log("inside try")
      const response = await axios.delete(`http://localhost:8080/api/ticket-drops/${userId}/${ticketId}`);
      console.log("Delete Success")
      dispatch(deleteUTSuccess(response.data));
    }
    catch(error){
      dispatch(deleteUTFailure(error.message));
  }
}

export default userTicketSlice.reducer;