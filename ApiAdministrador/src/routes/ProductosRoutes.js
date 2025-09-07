const express = require('express');
const router = express.Router();
const productosController = require('../controllers/ProductosController');

// Obtener todos los productos
router.get('/', productosController.getAllProductos);

// Obtener un producto por ID
router.get('/:id', productosController.getProductoById);

// Crear un nuevo producto
router.post('/', productosController.createProducto);

// Actualizar un producto
router.put('/:id', productosController.updateProducto);

// Eliminar un producto
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
