const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // lidhja me databazen

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routers
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Routes usage
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
