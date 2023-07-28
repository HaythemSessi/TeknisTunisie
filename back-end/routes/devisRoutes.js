// routes/devisRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all devis
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM devis';
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving devis from the database.' });
    }
    return res.json(results);
  });
});

// Get a devis by id_d
router.get('/:id_d', (req, res) => {
  const id_d = req.params.id_d;
  const sql = 'SELECT * FROM devis WHERE id_d = ?';
  pool.query(sql, [id_d], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving devis from the database.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Devis not found.' });
    }
    return res.json(results[0]);
  });
});

// Add a new devis
router.post('/', (req, res) => {
  const { id_u, num_cli, state, num_ciel, nom_client } = req.body;
  const sql = 'INSERT INTO devis ( id_u, num_cli, state, num_ciel, nom_client) VALUES (?, ?, ?, ?, ?)';
  pool.query(sql, [id_u, num_cli, state, num_ciel, nom_client], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding devis to the database.' });
    }
    return res.json({ message: 'Devis added successfully.' });
  });
});

// Update an existing devis by id_d
router.put('/:id_d', (req, res) => {
  const id_d = req.params.id_d;
  const { id_u, num_cli, state, num_ciel, nom_client } = req.body;
  const sql = 'UPDATE devis SET id_u = ?, num_cli = ?, state = ?, num_ciel = ?, nom_client = ? WHERE id_d = ?';
  pool.query(sql, [id_u, num_cli, state, num_ciel, nom_client, id_d], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating devis in the database.' });
    }
    return res.json({ message: 'Devis updated successfully.' });
  });
});

// Delete a devis by id_d
router.delete('/:id_d', (req, res) => {
  const id_d = req.params.id_d;
  const sql = 'DELETE FROM devis WHERE id_d = ?';
  pool.query(sql, [id_d], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting devis from the database.' });
    }
    return res.json({ message: 'Devis deleted successfully.' });
  });
});

module.exports = router;
