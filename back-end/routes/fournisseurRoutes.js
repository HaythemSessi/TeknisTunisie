// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
// CRUD routes for the "client" table
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM fournisseur';
    pool.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving fournisseur from the database.' });
      }
      return res.json(results);
    });
  });
router.get('/:code', (req, res) => {
    const code = req.params.code;
    const sql = 'SELECT * FROM fournisseur WHERE code = ?';
    pool.query(sql, [code], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving fournisseur from the database.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'fournisseur not found.' });
      }
      return res.json(results[0]);
    });
  });
router.post('/',(req, res) => {
    const { code, nom, ste, zone, autre } = req.body;
    const sql = 'INSERT INTO fournisseur (code, nom, ste, zone, autre) VALUES (?, ?, ?, ?, ?)';
    pool.query(sql, [code, nom, ste, zone, autre], (err, result) => {
      if (err) {
        console.error('Error adding fournisseur to the database:', err);
        return res.status(500).json({ error: 'Error adding fournisseur to the database hahah.'+err.message});
      }
      return res.json({ message: 'fournisseur added successfully.' });
    });
  });
router.put('/:code', (req, res) => {
    const code = req.params.code;
    const { nom, ste, zone, autre } = req.body;
    const sql = 'UPDATE fournisseur SET nom = ?, ste = ?,zone= ?, autre = ? WHERE code = ?';
    pool.query(sql, [nom, ste, zone, autre, code], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating fournisseur in the database.' });
      }
      return res.json({ message: 'fournisseur updated successfully.' });
    });
  });
router.delete('/:code', (req, res) => {
    const code = req.params.code;
    const sql = 'DELETE FROM fournisseur WHERE code = ?';
    pool.query(sql, [code], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting fournisseur from the database.' });
      }
      return res.json({ message: 'fournisseur deleted successfully.' });
    });
  });

module.exports = router;
