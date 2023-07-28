const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM user';
    pool.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving clients from the database.' });
      }
      return res.json(results);
    });
  });
router.get('/:id_u', (req, res) => {
    const id_u = req.params.id_u;
    const sql = 'SELECT * FROM user WHERE id_u = ?';
    pool.query(sql, [id_u], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving client from the database.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
      return res.json(results[0]);
    });
  });
  router.post('/', async (req, res) => {
    const { nom, prenom, mail, role, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const sql = 'INSERT INTO user (nom, prenom, mail, role, password) VALUES (?, ?, ?, ?, ?)';
      pool.query(sql, [nom, prenom, mail, role, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error adding user to the database:', err);
          return res.status(500).json({ error: 'Error adding user to the database.' + err.message });
        }
        return res.json({ message: 'User added successfully.' });
      });
    } catch (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Error hashing password.' });
    }
  });
  
router.put('/:id_u', (req, res) => {
    const id_u = req.params.id_u;
    const { nom, prenom, mail, fonction, role, password } = req.body;
    const sql = 'UPDATE user SET nom = ?, prenom = ?,mail= ?, fonction = ?, role = ? , password = ? WHERE id_u = ?';
    pool.query(sql, [nom, prenom, mail, fonction, role, password, id_u], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating client in the database.' });
      }
      return res.json({ message: 'User updated successfully.' });
    });
  });
router.delete('/:id_u', (req, res) => {
    const id_u = req.params.id_u;
    const sql = 'DELETE FROM user WHERE id_u = ?';
    pool.query(sql, [id_u], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting client from the database.' });
      }
      return res.json({ message: 'User deleted successfully.' });
    });
  });

module.exports = router;
