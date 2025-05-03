// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add user
router.post('/', (req, res) => {
    const { name, email, note } = req.body;
    console.log('Received:', { name, email, note }); // 👈 Add this
    db.query(
      'INSERT INTO users (name, email, note) VALUES (?, ?, ?)',
      [name, email, note],
      (err) => {
        if (err) return res.status(500).send(err);
        res.send('User added');
  });
});

// Get users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;