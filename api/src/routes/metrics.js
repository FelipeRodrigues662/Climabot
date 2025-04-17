const express = require('express');
const router = express.Router();
const promClient = require('prom-client');

router.get('/', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

module.exports = router;
