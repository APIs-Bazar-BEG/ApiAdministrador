async function getAllProductos(pool) {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
  } catch (err) {
    throw new Error('Error al obtener los productos: ' + err.message);
  }
}

async function getProductoById(pool, id) {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error('Error al obtener el producto: ' + err.message);
  }
}

async function createProducto(pool, { nombre, descripcion, precio, stock, imagen_url, categoria_id }) {
  try {
    const [result] = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, categoria_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion || null, precio, stock, imagen_url || null, categoria_id]
    );

    return { id: result.insertId, nombre, precio };
  } catch (err) {
    throw new Error('Error al crear el producto: ' + err.message);
  }
}

async function updateProducto(pool, id, { nombre, descripcion, precio, stock, imagen_url, categoria_id, status }) {
  try {
    const [result] = await pool.query(
      `UPDATE productos 
       SET nombre = ?, descripcion = ?, precio = ?, stock = ?, 
           imagen_url = ?, categoria_id = ?, status = ? 
       WHERE id = ?`,
      [nombre, descripcion || null, precio, stock, imagen_url || null, categoria_id, status, id]
    );

    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error al actualizar el producto: ' + err.message);
  }
}

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
