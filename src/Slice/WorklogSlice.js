
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  worklogs: [],
  status: 'idle',
  error: null,
};

const worklogSlice = createSlice({
  name: 'worklogs',
  initialState,
  reducers: {
    addWorklogPending: (state) => {
      state.status = 'loading';
    },
    reorderTickets: (state, action) => {
      console.log("--------------->",action)
      state.tickets = action.payload;
    },
    addWorklogFulfilled: (state, action) => {
      state.status = 'succeeded';
      state.worklogs.push(action.payload);
    },
    addWorklogRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchWorklogsStart(state) {
      state.status = 'loading';
    },
    fetchWorklogsSuccess(state, action) {
      state.status = 'succeeded';
      state.worklogs = action.payload;
    },
    fetchWorklogsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchWorklogsStart,
  fetchWorklogsSuccess,
  fetchWorklogsFailure,
  addWorklogPending,
  addWorklogFulfilled,
  addWorklogRejected,
  reorderTickets
} = worklogSlice.actions;

export default worklogSlice.reducer;

// Action to add a worklog to the backend
export const addWorklogToBackend = (ticketId, worklogData) => {
  console.log("url",ticketId)
  console.log("....***...",worklogData)
  console.log("add")
  return async (dispatch) => {
    dispatch(addWorklogPending());
    try {
      console.log("add1")
      const response = await axios.post(`http://localhost:8080/worklogs/${ticketId}`, worklogData);
      dispatch(addWorklogFulfilled(response.data));
    } catch (error) {
      dispatch(addWorklogRejected(error.message));
    }
  };
};


export const fetchWorklogs = (ticketId) => {

  return async (dispatch) => {
    dispatch(fetchWorklogsStart());
    try {
      const response = await axios.get(`http://localhost:8080/worklogs/by-ticket/${ticketId}`);

      if (response.status === 200) {
        const data = response.data;
        dispatch(fetchWorklogsSuccess(data));
      } else {
        throw new Error('Failed to fetch worklogs');
      }
    } catch (error) {
      dispatch(fetchWorklogsFailure(error.message));
    }
  };
};
