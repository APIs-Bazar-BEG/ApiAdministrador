//Comentario para asociar con Jira

const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/CategoriasController');
const categoriasService = require('../services/CategoriasService');
const pool = require('config/db');
const multer = require('multer');

// Configuración Multer para guardar en memoria (no en disco)
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todas las categorías
router.get('/', (req, res) => categoriasController.getAllCategorias(req, res));

// Crear una nueva categoría con imagen
router.post('/', upload.single('imagen'), (req, res) => categoriasController.createCategoria(req, res));

// Obtener una categoría por ID
router.get('/:id', (req, res) => categoriasController.getCategoriaById(req, res));

// 🔥 Nueva ruta para solo la imagen de una categoría
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

// Actualizar una categoría (con nueva imagen si se manda)
router.put('/:id', upload.single('imagen'), (req, res) => categoriasController.updateCategoria(req, res));

// Eliminar una categoría
router.delete('/:id', (req, res) => categoriasController.deleteCategoria(req, res));

module.exports = router;
