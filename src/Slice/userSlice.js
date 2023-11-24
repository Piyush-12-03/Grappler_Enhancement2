import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const response = await axios.get('http://localhost:8080/users');
      // console.log(response);
      dispatch(fetchUsersFulfilled(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(fetchUsersRejected(error.message));
    }
  };
};
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersPending: (state) => {
        state.status = 'loading';
      },
      fetchUsersFulfilled: (state, action) => {
        // console.log(state);
        state.status = 'succeeded';
        state.users = action.payload;
      },
      fetchUsersRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }
    },
});
export const {
    fetchUsersPending,
    fetchUsersFulfilled,
    fetchUsersRejected
} = userSlice.actions;
export default userSlice.reducer;