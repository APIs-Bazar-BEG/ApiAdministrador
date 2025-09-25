//Comentario para asociar con Jira

const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/CategoriasController');
const categoriasService = require('../services/CategoriasService');
const pool = require('../config/db');
const multer = require('multer');
const authMiddleware = require("../middlewares/authMiddleware"); 

// Configuración Multer para guardar en memoria (no en disco)
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todas las categorías (sin middleware)
router.get('/', (req, res) => categoriasController.getAllCategorias(req, res));

// Crear una nueva categoría con imagen (con middleware)
router.post(
  '/', 
  authMiddleware, 
  upload.single('imagen'), 
  (req, res) => categoriasController.createCategoria(req, res)
);

// Obtener una categoría por ID (sin middleware)
router.get('/:id', (req, res) => categoriasController.getCategoriaById(req, res));

// Nueva ruta para solo la imagen de una categoría (sin middleware)
router.get('/:id/imagen', async (req, res) => {
  try {
    const categoria = await categoriasService.getCategoriaById(pool, req.params.id);
    if (!categoria || !categoria.imagen) {
      return res.status(404).send("Imagen no encontrada");
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(categoria.imagen, 'base64'));
  } catch (err) {
    res.status(500).send("Error al obtener la imagen: " + err.message);
  }
});

// Actualizar una categoría (con middleware)
router.put(
  '/:id',
  authMiddleware,
  upload.single('imagen'),
  (req, res) => categoriasController.updateCategoria(req, res)
);

// Eliminar una categoría (con middleware)
router.delete(
  '/:id',
  authMiddleware,
  (req, res) => categoriasController.deleteCategoria(req, res)
);

module.exports = router;
