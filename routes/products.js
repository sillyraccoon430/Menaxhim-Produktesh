const express = require('express');
const router = express.Router();
const db = require('../db'); // lidhja me databazën

// CREATE - Shto një produkt të ri
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(sql, [name, price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Produkti u shtua me sukses!');
  });
});

// READ - Merr të gjitha produktet
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// UPDATE - Përditëso një produkt ekzistues
router.put('/:id', (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
  db.query(sql, [name, price, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Produkti u përditësua me sukses!');
  });
});

// DELETE - Fshij një produkt
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('🗑️ Produkti u fshi me sukses!');
  });
});

module.exports = router;
