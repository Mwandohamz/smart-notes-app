const express = require('express');
const { handleSummarize, handleQuestion } = require('../controllers/notesController');

const router = express.Router();

router.post('/summarize', handleSummarize);
router.post('/ask', handleQuestion);

module.exports = router;

