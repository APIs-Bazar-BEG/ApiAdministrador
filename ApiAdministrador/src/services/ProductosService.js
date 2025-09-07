const sql = require('mssql');

async function getAllProductos(pool) {
  try {
    const result = await pool.request().query('SELECT * FROM productos');
    return result.recordset;
  } catch (err) {
    throw new Error('Error al obtener los productos: ' + err.message);
  }
}

async function getProductoById(pool, id) {
  try {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM productos WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (err) {
    throw new Error('Error al obtener el producto: ' + err.message);
  }
}

async function createProducto(pool, { nombre, descripcion, precio, stock, imagen_url, categoria_id }) {
  try {
    const result = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('descripcion', sql.Text, descripcion || null)
      .input('precio', sql.Decimal(10, 2), precio)
      .input('stock', sql.Int, stock)
      .input('imagen_url', sql.VarChar, imagen_url || null)
      .input('categoria_id', sql.Int, categoria_id)
      .query(`
        INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, categoria_id)
        VALUES (@nombre, @descripcion, @precio, @stock, @imagen_url, @categoria_id);
        SELECT SCOPE_IDENTITY() AS id;
      `);
      
    return { id: result.recordset[0].id, nombre, precio };
  } catch (err) {
    throw new Error('Error al crear el producto: ' + err.message);
  }
}

async function updateProducto(pool, id, { nombre, descripcion, precio, stock, imagen_url, categoria_id, status }) {
  try {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar, nombre)
      .input('descripcion', sql.Text, descripcion || null)
      .input('precio', sql.Decimal(10, 2), precio)
      .input('stock', sql.Int, stock)
      .input('imagen_url', sql.VarChar, imagen_url || null)
      .input('categoria_id', sql.Int, categoria_id)
      .input('status', sql.Int, status)
      .query(`
        UPDATE productos
        SET nombre = @nombre, descripcion = @descripcion, precio = @precio,
            stock = @stock, imagen_url = @imagen_url, categoria_id = @categoria_id,
            status = @status
        WHERE id = @id;
      `);

    return result.rowsAffected[0] > 0;
  } catch (err) {
    throw new Error('Error al actualizar el producto: ' + err.message);
  }
}

async function deleteProducto(pool, id) {
  try {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM productos WHERE id = @id');

    return result.rowsAffected[0] > 0;
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
