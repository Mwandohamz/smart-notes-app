const express = require('express');
const { handleSummarize } = require('../controllers/notesController');

const router = express.Router();

router.post('/summarize', handleSummarize);

module.exports = router;

