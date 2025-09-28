//Comentario para asociar con Jira, controller creado el 9 Septiembre 2025
const pool = require('../config/db');
const categoriasService = require('../services/CategoriasService');

// Obtener todas las categorías
async function getAllCategorias(req, res) {
  try {
    const categorias = await categoriasService.getAllCategorias(pool);
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Crear categoría
async function createCategoria(req, res) {
  try {
    const { nombre } = req.body;
    const imagen = req.file ? req.file.buffer : null;

    const nuevaCategoria = await categoriasService.createCategoria(pool, { nombre, imagen });
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar categoría
async function updateCategoria(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    // Solo actualizamos la imagen si llega un archivo nuevo
    const imagen = req.file ? req.file.buffer : null;

    const updated = await categoriasService.updateCategoria(pool, id, { nombre, imagen });
    if (!updated) {
      return res.status(404).json({ error: 'Categoría no encontrada o no actualizada' });
    }

    res.json({ msg: 'Categoría actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar categoría
async function deleteCategoria(req, res) {
  try {
    const { id } = req.params;

    const deleted = await categoriasService.deleteCategoria(pool, id);
    if (!deleted) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ msg: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la categoría: ' + err.message });
  }
}

async function getCategoriaByIdController(req, res) {
  try {
    const id = req.params.id;
    const categoria = await categoriasService.getCategoriaById(pool, id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  getAllCategorias,
  createCategoria,
   getCategoriaById: getCategoriaByIdController,
  updateCategoria: (req, res) => updateCategoria(req, res), 
  deleteCategoria: (req, res) => deleteCategoria(req, res)
};
