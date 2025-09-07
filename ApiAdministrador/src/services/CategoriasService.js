const sql = require('mssql');

async function getAllCategorias(pool) {
  try {
    const result = await pool.request().query('SELECT * FROM categorias');
    return result.recordset;
  } catch (err) {
    throw new Error('Error al obtener las categorías: ' + err.message);
  }
}

async function createCategoria(pool, { nombre, imagen_url }) {
  try {
    const result = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('imagen_url', sql.VarChar, imagen_url || null)
      .query(`
        INSERT INTO categorias (nombre, imagen_url)
        VALUES (@nombre, @imagen_url);
        SELECT SCOPE_IDENTITY() AS id;
      `);
    
    return { id: result.recordset[0].id, nombre, imagen_url };
  } catch (err) {
    throw new Error('Error al crear la categoría: ' + err.message);
  }
}

async function getCategoriaById(pool, id) {
  try {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM categorias WHERE id = @id');

    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (err) {
    throw new Error('Error al obtener la categoría: ' + err.message);
  }
}

async function updateCategoria(pool, id, { nombre, imagen_url }) {
  try {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar, nombre)
      .input('imagen_url', sql.VarChar, imagen_url || null)
      .query(`
        UPDATE categorias
        SET nombre = @nombre, imagen_url = @imagen_url
        WHERE id = @id;
      `);

    return result.rowsAffected[0] > 0;
  } catch (err) {
    throw new Error('Error al actualizar la categoría: ' + err.message);
  }
}

async function deleteCategoria(pool, id) {
  try {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM categorias WHERE id = @id');

    return result.rowsAffected[0] > 0;
  } catch (err) {
    throw new Error('Error al eliminar la categoría: ' + err.message);
  }
}

module.exports = {
  getAllCategorias,
  createCategoria,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
};
