// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/users');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/users', userRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Fallback to index.html for unknown routes (for React Router etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
