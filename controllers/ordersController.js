const db = require('../db');

// Create order
exports.createOrder = (req, res) => {
  const { product_id, quantity } = req.body;
  db.query('INSERT INTO orders (product_id, quantity) VALUES (?, ?)', [product_id, quantity], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Order created', orderId: results.insertId });
  });
};

// Get all orders
exports.getAllOrders = (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get one order
exports.getOrderById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Order not found' });
    res.json(results[0]);
  });
};

// Update order
exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { product_id, quantity } = req.body;
  db.query('UPDATE orders SET product_id = ?, quantity = ? WHERE id = ?', [product_id, quantity, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order updated' });
  });
};

// Delete order
exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM orders WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order deleted' });
  });
};
