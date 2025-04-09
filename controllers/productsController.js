const db = require('../db');

// Create product
exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product created', productId: results.insertId });
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get one product
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product updated' });
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product deleted' });
  });
};
