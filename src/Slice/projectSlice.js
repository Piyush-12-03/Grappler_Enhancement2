import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  projects: [],
  status: false,
  error: null,
};
export const fetchProjects = () => {
  return async (dispatch) => {
    dispatch(fetchProjectsPending());
    try {
      const response = await axios.get('http://localhost:8080/projects/');
      // console.log(response.data);
      dispatch(fetchProjectsFulfilled(response.data));
    } catch (error) {
      // console.error("Error fetching projects:", error);
      dispatch(fetchProjectsRejected(error.message));
    }
  };
};
const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        fetchProjectsPending: (state) => {
        state.status = true;  
      },
      fetchProjectsFulfilled: (state, action) => {
        // console.log(state);
        state.status = false;
        state.projects = action.payload;
      },
      fetchProjectsRejected: (state, action) => {
        state.status = false;
        state.error = action.payload;
      }
    },
});
export const {
    fetchProjectsPending,
    fetchProjectsFulfilled,
    fetchProjectsRejected
} = projectsSlice.actions;
export default projectsSlice.reducer;