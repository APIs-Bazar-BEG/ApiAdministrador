const express = require('express');
require('dotenv').config();
const categoriasRoutes = require('./routes/CategoriasRoutes');
const productosRoutes = require('./routes/ProductosRoutes');

const app = express();
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('🚀 API de Administración de BazarBEG está en funcionamiento.');
});

// Rutas para las APIs de Categorías y Productos
app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
