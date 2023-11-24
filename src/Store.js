// store.js
import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './Slice/projectSlice';
import ticketSlice from './Slice/ticketSlice';
import WorklogSlice from './Slice/WorklogSlice';
import userSlice from './Slice/userSlice';
import userTicket from './Slice/userTicket';
const store = configureStore({
  reducer: {
    projects: projectSlice,
    tickets: ticketSlice,
    worklogs:WorklogSlice,
    users:userSlice,
    userTickets: userTicket

  },
});

export default store;
