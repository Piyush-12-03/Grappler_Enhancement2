import axios from 'axios';

const backendUrl = 'http://localhost:8080'; // Replace with your backend URL

const worklogService = {
  addWorklog: async (worklogData) => {
    try {
      const response = await axios.post(`${backendUrl}/worklogs`, worklogData); // Replace with your API endpoint
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Add more methods for fetching, updating, or deleting worklogs as needed
};

export default worklogService;
