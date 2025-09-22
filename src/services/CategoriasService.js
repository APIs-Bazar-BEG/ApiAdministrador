//Comentario para asociar con Jira, service creado el 9 Septiembre 2025

/// Obtener todas las categorías
async function getAllCategorias(pool) {
  try {
    const [rows] = await pool.query("SELECT id, nombre, imagen FROM categorias");

    return rows.map(cat => ({
      id: cat.id,
      nombre: cat.nombre,
      imagen: cat.imagen ? cat.imagen.toString("base64") : null
    }));
  } catch (err) {
    throw new Error("Error al obtener categorías: " + err.message);
  }
}

// Crear categoría
async function createCategoria(pool, { nombre, imagen }) {
  try {
    const [result] = await pool.query(
      `INSERT INTO categorias (nombre, imagen) VALUES (?, ?)`,
      [nombre, imagen || null]
    );
    return {
      id: result.insertId,
      nombre,
      imagen: imagen ? imagen.toString("base64") : null
    };
  } catch (err) {
    throw new Error("Error al crear la categoría: " + err.message);
  }
}

// Obtener categoría por ID
async function getCategoriaById(pool, id) {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, imagen FROM categorias WHERE id = ?",
      [id]
    );
    if (rows.length === 0) return null;

    const categoria = rows[0];
    return {
      id: categoria.id,
      nombre: categoria.nombre,
      imagen: categoria.imagen ? categoria.imagen.toString("base64") : null
    };
  } catch (err) {
    throw new Error("Error al obtener la categoría: " + err.message);
  }
}

// Actualizar categoría
async function updateCategoria(pool, id, { nombre, imagen }) {
  try {
    const [result] = await pool.query(
      `UPDATE categorias 
       SET nombre = ?, imagen = COALESCE(?, imagen) 
       WHERE id = ?`,
      [nombre, imagen || null, id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error("Error al actualizar la categoría: " + err.message);
  }
}

// Eliminar categoría
async function deleteCategoria(pool, id) {
  try {
    const [result] = await pool.query(
      "DELETE FROM categorias WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error("Error al eliminar la categoría: " + err.message);
  }
}

module.exports = {
  getAllCategorias,
  createCategoria,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
};
