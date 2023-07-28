// routes/productItemRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all product items
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM ligne';
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving product items from the database.' });
    }
    return res.json(results);
  });
});

// Get a product item by id_d
router.get('/:id_l', (req, res) => {
  const id_l = req.params.id_l;
  const sql = 'SELECT * FROM ligne WHERE id_l = ?';
  pool.query(sql, [id_l], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving product item from the database.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product item not found.' });
    }
    return res.json(results[0]);
  });
});

// Add a new product item
router.post('/', (req, res) => {
  const { ref_t, designation, ref_f, qte, unit, pa_u, tot_achat, trsp_u, trsp_t, frais_locaux, pa_brut, pu_ven, marge_p, tot_v, marge_u_net, prix_standard, prix_ciel, prix_internet, prix_objectif } = req.body;
  const sql = 'INSERT INTO ligne (ref_t, designation, ref_f, qte, unit, pa_u, tot_achat, trsp_u, trsp_t, frais_locaux, pa_brut, pu_ven, marge_p, tot_v, marge_u_net, prix_standard, prix_ciel, prix_internet, prix_objectif) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [ref_t, designation, ref_f, qte, unit, pa_u, tot_achat, trsp_u, trsp_t, frais_locaux, pa_brut, pu_ven, marge_p, tot_v, marge_u_net, prix_standard, prix_ciel, prix_internet, prix_objectif], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding product item to the database.' });
    }
    return res.json({ message: 'Product item added successfully.' });
  });
});

// Update an existing product item by id_d
router.put('/:id_l', (req, res) => {
  const id_l = req.params.id_l;
  const { ref_t, designation, ref_f, qte, unit, pa_u, tot_achat, trsp_u, trsp_t, frais_locaux, pa_brut, pu_ven, marge_p, tot_v, marge_u_net, prix_standard, prix_ciel, prix_internet, prix_objectif } = req.body;
  const sql = 'UPDATE ligne SET ref_t = ?, designation = ?, ref_f = ?, qte = ?, unit = ?, pa_u = ?, tot_achat = ?, trsp_u = ?, trsp_t = ?, frais_locaux = ?, pa_brut = ?, pu_ven = ?, marge_p = ?, tot_v = ?, marge_u_net = ?, prix_standard = ?, prix_ciel = ?, prix_internet = ?, prix_objectif = ? WHERE id_l = ?';
  pool.query(sql, [ref_t, designation, ref_f, qte, unit, pa_u, tot_achat, trsp_u, trsp_t, frais_locaux, pa_brut, pu_ven, marge_p, tot_v, marge_u_net, prix_standard, prix_ciel, prix_internet, prix_objectif, id_l], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating product item in the database.' });
    }
    return res.json({ message: 'Product item updated successfully.' });
  });
});

// Delete a product item by id_d
router.delete('/:id_l', (req, res) => {
  const id_l = req.params.id_d;
  const sql = 'DELETE FROM ligne WHERE id_l = ?';
  pool.query(sql, [id_l], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting product item from the database.' });
    }
    return res.json({ message: 'Product item deleted successfully.' });
  });
});

module.exports = router;
