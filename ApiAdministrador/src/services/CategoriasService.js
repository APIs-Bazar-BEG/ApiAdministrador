async function getAllCategorias(pool) {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
  } catch (err) {
    console.error("❌ Error en getAllCategorias:", err);
    throw new Error('Error al obtener las categorías: ' + err.message);
  }
}

async function createCategoria(pool, { nombre, imagen_url }) {
  try {
    const [result] = await pool.query(
      `INSERT INTO categorias (nombre, imagen_url) VALUES (?, ?)`,
      [nombre, imagen_url || null]
    );
    return { id: result.insertId, nombre, imagen_url };
  } catch (err) {
    throw new Error('Error al crear la categoría: ' + err.message);
  }
}

async function getCategoriaById(pool, id) {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error('Error al obtener la categoría: ' + err.message);
  }
}

async function updateCategoria(pool, id, { nombre, imagen_url }) {
  try {
    const [result] = await pool.query(
      `UPDATE categorias SET nombre = ?, imagen_url = ? WHERE id = ?`,
      [nombre, imagen_url || null, id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error al actualizar la categoría: ' + err.message);
  }
}

async function deleteCategoria(pool, id) {
  try {
    const [result] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
    return result.affectedRows > 0;
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
