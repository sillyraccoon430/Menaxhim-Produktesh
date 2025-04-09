// Importon libraritë
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Lidhja me databazën

// Inicializon Express
const app = express();
const PORT = 3000;

// Middleware për të lexuar JSON
app.use(bodyParser.json());

// Importon routers
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Përdor routers
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Starton serverin
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
