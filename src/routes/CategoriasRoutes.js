//Comentario para asociar con Jira

const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/CategoriasController');
const multer = require('multer');

// Configuración Multer para guardar en memoria (no en disco)
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todas las categorías
router.get('/', (req, res) => categoriasController.getAllCategorias(req, res));

// Crear una nueva categoría con imagen (en memoria → base de datos)
router.post('/', upload.single('imagen'), (req, res) => categoriasController.createCategoria(req, res));

// Obtener una categoría por ID
router.get('/:id', (req, res) => categoriasController.getCategoriaById(req, res));

// Actualizar una categoría (con nueva imagen si se manda)
router.put('/:id', upload.single('imagen'), (req, res) => categoriasController.updateCategoria(req, res));

// Eliminar una categoría
router.delete('/:id', (req, res) => categoriasController.deleteCategoria(req, res));

module.exports = router;
