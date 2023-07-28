const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const express = require('express');
const router = express.Router();

// Login route
router.post('/', (req, res) => {
  const { mail, password } = req.body;

  // Find the user by username in the database
  const sql = 'SELECT * FROM user WHERE mail = ?';
  pool.query(sql, [mail], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving user from the database.' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid mail or password.' });
    }

    // Compare the provided password with the hashed password
    const user = results[0];
    bcrypt.compare(password, user.password, (bcryptErr, match) => {
      if (bcryptErr) {
        return res.status(500).json({ error: 'Error comparing passwords.' });
      }
      if (!match) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // If passwords match, generate and send an access token
      const accessToken = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', {
        expiresIn: '1h', // Set the token expiration time
      });

      return res.json({ accessToken });
    });
  });
});
module.exports = router; 
