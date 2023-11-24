// rootReducer.js
import { combineReducers } from 'redux';
import projectReducer from './projectReducer'; // Import your project reducer here

const rootReducer = combineReducers({
  project: projectReducer, // Make sure to use a valid reducer here
  // Add other reducers if needed
});

export default rootReducer;
