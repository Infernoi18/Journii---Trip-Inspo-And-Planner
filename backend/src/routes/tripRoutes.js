const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Trip route working!');
});

module.exports = router;
