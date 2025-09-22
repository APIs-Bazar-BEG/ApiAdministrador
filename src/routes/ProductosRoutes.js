// src/routes/ProductosRoutes.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/ProductosController');
const productosService = require('../services/ProductosService');
const pool = require('../db');
const multer = require('multer');

// Configuración de multer en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todos los productos
router.get('/', (req, res) => productosController.getAllProductos(req, res));

// Crear producto con imagen
router.post('/', upload.single('imagen'), (req, res) => productosController.createProducto(req, res));

// Obtener producto por ID (datos)
router.get('/:id', (req, res) => productosController.getProductoById(req, res));

// Nueva ruta para solo la imagen
router.get('/:id/imagen', async (req, res) => {
  try {
    const imagen = await productosService.getProductoImagen(pool, req.params.id);

    if (!imagen) {
      return res.status(404).send("Imagen no encontrada");
    }

    res.setHeader('Content-Type', 'image/jpeg'); 
    res.send(imagen); 
  } catch (err) {
    res.status(500).send("Error al obtener la imagen: " + err.message);
  }
});



// Actualizar producto (con nueva imagen si llega)
router.put('/:id', upload.single('imagen'), (req, res) => productosController.updateProducto(req, res));

// Eliminar producto
router.delete('/:id', (req, res) => productosController.deleteProducto(req, res));

module.exports = router;
