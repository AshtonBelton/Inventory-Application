const express = require('express');
const router = express.Router();
const pool = require('../config/db');  

router.get('/categories', (req, res) => {
  pool.query('SELECT * FROM categories', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows);  
  });
});

module.exports = router;