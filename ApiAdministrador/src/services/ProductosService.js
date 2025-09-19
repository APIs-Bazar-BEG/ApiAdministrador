//Comentario para asociar con Jira, service creado el 9 Septiembre 2025

// Obtener todos los productos
async function getAllProductos(pool) {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows.map(prod => ({
      id: prod.id,
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      stock: prod.stock,
      categoria_id: prod.categoria_id,
      status: prod.status,
      imagen: prod.imagen ? prod.imagen.toString('base64') : null
    }));
  } catch (err) {
    throw new Error('Error al obtener los productos: ' + err.message);
  }
}

// Obtener producto por ID
async function getProductoById(pool, id) {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const prod = rows[0];
    return {
      id: prod.id,
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      stock: prod.stock,
      categoria_id: prod.categoria_id,
      status: prod.status,
      imagen: prod.imagen ? prod.imagen.toString('base64') : null
    };
  } catch (err) {
    throw new Error('Error al obtener el producto: ' + err.message);
  }
}

// Crear un producto
async function createProducto(req, res) {
  try {
    const { nombre, descripcion, precio, stock, categoria_id, status } = req.body;
    const imagen = req.file ? req.file.buffer : null; // ← toma la imagen del form-data

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

// Actualizar un producto
async function updateProducto(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria_id, status } = req.body;
    const imagen = req.file ? req.file.buffer : null; // ← nueva imagen si se manda

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
async function deleteProducto(pool, id) {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error al eliminar el producto: ' + err.message);
  }
}

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
