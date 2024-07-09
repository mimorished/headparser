// index.js

// Load environment variables from a .env file if present
require('dotenv').config();

// Initialize Express
const express = require('express');
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // Respond with 200 status for pre-flight requests

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Basic route to serve the index.html file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return client information
app.get('/api/whoami', function(req, res) {
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Your app is listening on port ${PORT}`);
});
