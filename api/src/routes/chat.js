const express = require('express');
const router = express.Router();
const sessions = require('../services/sessions.js');
const stateMachine = require('../services/stateMachine.js');

router.post('/', async (req, res) => {
  const { sessionId, message } = req.body;
  const session = sessions.getSession(sessionId);
  const response = await stateMachine.handleMessage(session, message);
  res.json(response);
});

module.exports = router;