const express = require('express');
const server = express();

// Add middleware to enable CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the origin(s) you want to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Define your routes and other server setup here

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
