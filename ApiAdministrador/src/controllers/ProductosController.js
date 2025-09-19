const pool = require('../db'); 
const productosService = require('../services/ProductosService');

// Obtener todos los productos
async function getAllProductos(req, res) {
  try {
    const productos = await productosService.getAllProductos(pool);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener producto por ID
async function getProductoById(req, res) {
  try {
    const producto = await productosService.getProductoById(pool, req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Crear producto (acepta imagen en base64)
async function createProducto(req, res) {
  try {
    const { nombre, descripcion, precio, stock, categoria_id, status, imagen } = req.body;
    const nuevoProducto = await productosService.createProducto(pool, {
      nombre, descripcion, precio, stock, categoria_id, status, imagen
    });
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar producto (acepta imagen en base64)
async function updateProducto(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria_id, status, imagen } = req.body;
    const updated = await productosService.updateProducto(pool, id, {
      nombre, descripcion, precio, stock, categoria_id, status, imagen
    });
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado o no actualizado' });
    res.json({ msg: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar producto
async function deleteProducto(req, res) {
  try {
    const deleted = await productosService.deleteProducto(pool, req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado o no eliminado' });
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
  deleteProducto
};
