const express = require('express');
const router = express.Router();
const db = require('../db'); // lidhja me databazën

// CREATE - Shton një porosi të re
router.post('/', (req, res) => {
  const { product_id, quantity, total_price } = req.body;
  const sql = 'INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)';
  db.query(sql, [product_id, quantity, total_price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Porosia u shtua me sukses!');
  });
});

// READ - Merr të gjitha porositë
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// UPDATE - Përditëson një porosi ekzistuese
router.put('/:id', (req, res) => {
  const { product_id, quantity } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE orders SET product_id = ?, quantity = ? WHERE id = ?';
  db.query(sql, [product_id, quantity, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Porosia u përditësua me sukses!');
  });
});

// DELETE - Fshin një porosi
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM orders WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('🗑️ Porosia u fshi me sukses!');
  });
});



// GET /orders/:id - Merr një order sipas ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching order by ID:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    if (results.length === 0) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    
    res.json(results[0]);
  });
});

module.exports = router;

