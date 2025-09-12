//Comentario para asociar con Jira, controller creado el 9 Septiembre 2025
const pool = require('../db'); 
const categoriasService = require('../services/CategoriasService');

async function getAllCategorias(req, res) {
  try {
    const categorias = await categoriasService.getAllCategorias(pool);
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createCategoria(req, res) {
  try {
    const nuevaCategoria = await categoriasService.createCategoria(pool, req.body);
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getCategoriaById(req, res) {
  try {
    const categoria = await categoriasService.getCategoriaById(pool, req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateCategoria(req, res) {
  try {
    const { id } = req.params;
    const { nombre, imagen_url } = req.body;
    const updated = await categoriasService.updateCategoria(pool, id, { nombre, imagen_url });
    if (!updated) {
      return res.status(404).json({ error: 'Categoría no encontrada o no actualizada' });
    }
    res.json({ msg: 'Categoría actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteCategoria(req, res) {
  try {
    const deleted = await categoriasService.deleteCategoria(pool, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Categoría no encontrada o no eliminada' });
    }
    res.json({ msg: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllCategorias,
  createCategoria,
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
};
