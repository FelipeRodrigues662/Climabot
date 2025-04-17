const { v4: uuidv4 } = require('uuid');

const sessions = {};

function getSession(sessionId) {
  if (!sessionId || !sessions[sessionId]) {
    const newId = uuidv4();
    sessions[newId] = { id: newId, state: 'welcome' };
    return sessions[newId];
  }
  return sessions[sessionId];
}

module.exports = { getSession };