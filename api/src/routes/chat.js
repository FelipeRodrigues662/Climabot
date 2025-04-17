const express = require('express');
const router = express.Router();
const sessions = require('../../sessions');
const stateMachine = require('../stateMachine');

router.post('/', async (req, res) => {
  const { sessionId, message } = req.body;
  const session = sessions.getSession(sessionId);
  const response = await stateMachine.handleMessage(session, message);
  res.json(response);
});

module.exports = router;