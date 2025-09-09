const { poolPromise } = require('../db');
const productosService = require('../services/ProductosService');

async function getAllProductos(req, res) {
  try {
    const pool = await poolPromise;
    const productos = await productosService.getAllProductos(pool);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProductoById(req, res) {
  try {
    const pool = await poolPromise;
    const producto = await productosService.getProductoById(pool, req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createProducto(req, res) {
  try {
    const pool = await poolPromise;
    const nuevoProducto = await productosService.createProducto(pool, req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateProducto(req, res) {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const updated = await productosService.updateProducto(pool, id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Producto no encontrado o no actualizado' });
    }
    res.json({ msg: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteProducto(req, res) {
  try {
    const pool = await poolPromise;
    const deleted = await productosService.deleteProducto(pool, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado o no eliminado' });
    }
    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
