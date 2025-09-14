const express = require('express');
const cors = require('cors'); // Add this line
const app = express();

// Enable CORS for all routes
app.use(cors());

// Your existing middleware
app.use(express.json());

// Your routes
app.use('/compare', require('./routes/compare'));

// Start server
app.listen(4000, () => {
  console.log('Server running on port 4000');
});