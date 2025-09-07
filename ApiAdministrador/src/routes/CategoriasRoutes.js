const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/CategoriasController');

// Obtener todas las categorías
router.get('/', categoriasController.getAllCategorias);

// Crear una nueva categoría
router.post('/', categoriasController.createCategoria);

// Obtener una categoría por ID
router.get('/:id', categoriasController.getCategoriaById);

// Actualizar una categoría
router.put('/:id', categoriasController.updateCategoria);

// Eliminar una categoría
router.delete('/:id', categoriasController.deleteCategoria);

module.exports = router;
