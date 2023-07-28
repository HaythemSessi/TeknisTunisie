// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all articles
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM article';
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving articles from the database.' });
    }
    return res.json(results);
  });
});

// Get an article by ref_tt
router.get('/:ref_tt', (req, res) => {
  const ref_tt = req.params.ref_tt;
  const sql = 'SELECT * FROM article WHERE ref_tt = ?';
  pool.query(sql, [ref_tt], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving article from the database.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    return res.json(results[0]);
  });
});

// Add a new article
router.post('/', (req, res) => {
  const { ref_tt, ref_f, designation, pa, conditionnement, moq, nom_f } = req.body;
  const sql = 'INSERT INTO article (ref_tt, ref_f, designation, pa, conditionnement, moq, nom_f) VALUES (?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [ref_tt, ref_f, designation, pa, conditionnement, moq, nom_f], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding article to the database.' });
    }
    return res.json({ message: 'Article added successfully.' });
  });
});

// Update an existing article by ref_tt
router.put('/:ref_tt', (req, res) => {
  const ref_tt = req.params.ref_tt;
  const { ref_f, designation, pa, conditionnement, moq, nom_f } = req.body;
  const sql = 'UPDATE article SET ref_f = ?, designation = ?, pa = ?, conditionnement = ?, moq = ?, nom_f = ? WHERE ref_tt = ?';
  pool.query(sql, [ref_f, designation, pa, conditionnement, moq, nom_f, ref_tt], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating article in the database.' });
    }
    return res.json({ message: 'Article updated successfully.' });
  });
});

// Delete an article by ref_tt
router.delete('/:ref_tt', (req, res) => {
  const ref_tt = req.params.ref_tt;
  const sql = 'DELETE FROM article WHERE ref_tt = ?';
  pool.query(sql, [ref_tt], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting article from the database.' });
    }
    return res.json({ message: 'Article deleted successfully.' });
  });
});

module.exports = router;
