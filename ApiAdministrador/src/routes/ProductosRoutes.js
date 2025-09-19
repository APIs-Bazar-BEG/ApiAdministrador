//Comentario para asociar con Jira
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/ProductosController');
const multer = require('multer');

// Configuración Multer para guardar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todos los productos
router.get('/', productosController.getAllProductos);

// Obtener un producto por ID
router.get('/:id', productosController.getProductoById);

// Crear un nuevo producto con imagen
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    const imagen = req.file ? req.file.buffer : null;
    const nuevoProducto = await productosController.createProducto({
      body: { nombre, descripcion, precio, stock, categoria_id, imagen }
    }, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar un producto (puede actualizar la imagen)
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id, status } = req.body;
    const imagen = req.file ? req.file.buffer : null;
    await productosController.updateProducto({
      params: { id: req.params.id },
      body: { nombre, descripcion, precio, stock, categoria_id, status, imagen }
    }, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un producto
router.delete('/:id', productosController.deleteProducto);

module.exports = router;

// Crear producto con imagen
router.post('/', upload.single('imagen'), productosController.createProducto);

// Actualizar producto con imagen
router.put('/:id', upload.single('imagen'), productosController.updateProducto);
