const express = require('express');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();

// Allow requests from the frontend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Mount API routes
app.use('/api', notesRouter);

module.exports = app;