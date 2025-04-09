// Importo libraritë
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Lidhja me databazën

// Inicializo Express
const app = express();
const PORT = 3000;

// Middleware për të lexuar JSON
app.use(bodyParser.json());

// Importo routers
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Përdor routers
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Starto serverin
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
