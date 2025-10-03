const express = require('express');
require('dotenv').config();

// Rutas de tu aplicación
const categoriasRoutes = require('./src/routes/CategoriasRoutes');
const productosRoutes = require('./src/routes/ProductosRoutes');

const app = express();
app.use(express.json());

// Ruta principal para verificar que la API está viva
app.get('/', (req, res) => {
    // Nota: Esta ruta estará disponible en la raíz de tu dominio de Vercel.
    res.send('🚀 API de Administración de BazarBEG está en funcionamiento.');
});

// Rutas para las APIs de Categorías y Productos
app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes);

// ************************************************
// IMPORTANTE PARA VERCEL:
// La sección app.listen() se ELIMINA para usar la infraestructura Serverless.
// ************************************************

// Exporta la instancia de la aplicación para que Vercel la ejecute.
// Usamos module.exports para ser consistentes con la sintaxis de 'require'.
module.exports = app;