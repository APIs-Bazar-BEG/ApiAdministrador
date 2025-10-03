const express = require('express');
const router = express.Router();
const productosController = require('../controllers/ProductosController');
const productosService = require('../services/ProductosService');
const pool = require('../config/db');
const multer = require('multer');
const authMiddleware = require("../middlewares/authMiddleware"); 

// Configuración de multer en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todos los productos (sin middleware)
router.get('/', (req, res) => productosController.getAllProductos(req, res));

// Crear producto con imagen (con middleware)
router.post(
  '/', 
  authMiddleware, 
  upload.single('imagen'), 
  (req, res) => productosController.createProducto(req, res)
);

// Obtener producto por ID (sin middleware)
router.get('/:id', (req, res) => productosController.getProductoById(req, res));

// Nueva ruta para solo la imagen (sin middleware)
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

// Actualizar producto (con middleware)
router.put(
  '/:id', 
  authMiddleware, 
  upload.single('imagen'), 
  (req, res) => productosController.updateProducto(req, res)
);

// Eliminar producto (con middleware)
router.delete(
  '/:id', 
  authMiddleware, 
  (req, res) => productosController.deleteProducto(req, res)
);

// Buscar por IDs (POST porque se manda array en body)
router.post("/buscar", productosController.buscarPorIds);

// Productos por categoría
router.get("/categoria/:id", productosController.getByCategoria);

// Productos activos
router.get("/activos", productosController.getActivos);

// Productos activos por categoría
router.get("/categoria/:id/activos", productosController.getActivosPorCategoria);

module.exports = router;
