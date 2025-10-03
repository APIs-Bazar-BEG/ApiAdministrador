const pool = require('../config/db');
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

// Crear producto
// Crear producto (acepta imagen en base64 o form-data con multer)
async function createProducto(req, res) {
  try {
    // 👇 Debug para ver qué está llegando desde Postman
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("HEADERS:", req.headers['content-type']);

    const { nombre, descripcion, precio, stock, categoria_id, status } = req.body;
    const imagen = req.file ? req.file.buffer : null;

    const nuevoProducto = await productosService.createProducto(pool, {
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      status,
      imagen
    });

    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}



// Actualizar producto
async function updateProducto(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria_id, status } = req.body;
    const imagen = req.file ? req.file.buffer : null;

    const updated = await productosService.updateProducto(pool, id, {
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      status,
      imagen
    });

    if (!updated) {
      return res.status(404).json({ error: 'Producto no encontrado o no actualizado' });
    }

    res.json({ msg: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar producto
async function deleteProducto(req, res) {
  try {
    const { id } = req.params;

    const deleted = await productosService.deleteProducto(pool, id);
    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto: ' + err.message });
  }
}


async function getProductoByIdController(req, res) {
  try {
    const id = req.params.id;
    const producto = await productosService.getProductoById(pool, id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar por IDs
async function buscarPorIds(req, res) {
  try {
    const ids = req.body.ids; // Esperamos { "ids": [1,2,3] }
    const productos = await productosService.buscarPorIds(pool, ids);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar por categoría
async function getByCategoria(req, res) {
  try {
    const { id } = req.params;
    const productos = await productosService.findByCategoriaId(pool, id);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Productos activos
async function getActivos(req, res) {
  try {
    const productos = await productosService.obtenerProductosActivos(pool);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Productos activos por categoría
async function getActivosPorCategoria(req, res) {
  try {
    const { id } = req.params;
    const productos = await productosService.obtenerProductosPorCategoriaActivos(pool, id);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllProductos,
  createProducto,
  getProductoById: getProductoByIdController,
  updateProducto: (req, res) => updateProducto(req, res),
  deleteProducto: (req, res) => deleteProducto(req, res),
  buscarPorIds,
  getByCategoria,
  getActivos,
  getActivosPorCategoria
};
