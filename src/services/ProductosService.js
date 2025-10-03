// Obtener todos los productos (SIN imagen)
async function getAllProductos(pool) {
  const [rows] = await pool.query(`
    SELECT id, nombre, descripcion, precio, stock, categoria_id, status 
    FROM productos
  `);

  return rows.map(prod => ({
    id: prod.id,
    nombre: prod.nombre,
    descripcion: prod.descripcion,
    precio: prod.precio,
    stock: prod.stock,
    categoria_id: prod.categoria_id,
    status: prod.status
  }));
}

// Obtener todos los productos (CON imagen)
async function getAllProductosImg(pool) {
  const [rows] = await pool.query(`
    SELECT id, nombre, descripcion, precio, stock, categoria_id, status, imagen 
    FROM productos
  `);

  return rows.map(prod => ({
    id: prod.id,
    nombre: prod.nombre,
    descripcion: prod.descripcion,
    precio: prod.precio,
    stock: prod.stock,
    categoria_id: prod.categoria_id,
    status: prod.status,
    imagen: prod.imagen ? prod.imagen.toString("base64") : null
  }));
}


// Crear producto
async function createProducto(pool, { nombre, descripcion, precio, stock, categoria_id, status, imagen }) {
  const [result] = await pool.query(
    `INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, status, imagen) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, descripcion, precio, stock, categoria_id, status, imagen || null]
  );

  return {
    id: result.insertId,
    nombre,
    descripcion,
    precio,
    stock,
    categoria_id,
    status,
    imagen: imagen ? imagen.toString("base64") : null
  };
}

// Obtener producto por ID (JSON con base64)
async function getProductoById(pool, id) {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio, stock, categoria_id, status, imagen 
     FROM productos WHERE id = ?`,
    [id]
  );
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
    imagen: prod.imagen ? prod.imagen.toString("base64") : null
  };
}

// obtener solo la imagen cruda (para endpoint /:id/imagen)
async function getProductoImagen(pool, id) {
  const [rows] = await pool.query(
    "SELECT imagen FROM productos WHERE id = ?",
    [id]
  );
  if (rows.length === 0) return null;
  return rows[0].imagen; 
}

// Actualizar producto
async function updateProducto(pool, id, { nombre, descripcion, precio, stock, categoria_id, status, imagen }) {
  const [result] = await pool.query(
    `UPDATE productos 
     SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?, status = ?, 
         imagen = COALESCE(?, imagen) 
     WHERE id = ?`,
    [nombre, descripcion, precio, stock, categoria_id, status, imagen || null, id]
  );
  return result.affectedRows > 0;
}

// Eliminar producto
async function deleteProducto(pool, id) {
  const [result] = await pool.query(
    "DELETE FROM productos WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

// Buscar productos por lista de IDs
async function buscarPorIds(pool, productosIds) {
  try {
    if (!productosIds || productosIds.length === 0) return [];

    const placeholders = productosIds.map(() => "?").join(",");
    const [rows] = await pool.query(
      `SELECT * FROM productos WHERE id IN (${placeholders})`,
      productosIds
    );

    return rows;
  } catch (err) {
    throw new Error("Error al buscar productos por IDs: " + err.message);
  }
}

// Buscar productos por categoría
async function findByCategoriaId(pool, categoriaId) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE categoria_id = ?",
      [categoriaId]
    );
    return rows;
  } catch (err) {
    throw new Error("Error al buscar productos por categoría: " + err.message);
  }
}

// Obtener solo productos activos
async function obtenerProductosActivos(pool) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE activo = 1"
    );
    return rows;
  } catch (err) {
    throw new Error("Error al obtener productos activos: " + err.message);
  }
}

// Obtener productos activos por categoría
async function obtenerProductosPorCategoriaActivos(pool, categoriaId) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE categoria_id = ? AND activo = 1",
      [categoriaId]
    );
    return rows;
  } catch (err) {
    throw new Error("Error al obtener productos por categoría activos: " + err.message);
  }
}


module.exports = {
  getAllProductos,
  createProducto,
  getProductoById,
  getProductoImagen, //  ruta de imagen
  updateProducto,
  deleteProducto,
  getAllProductosImg, // productos con imagen
  buscarPorIds,
  findByCategoriaId,
  obtenerProductosActivos,
  obtenerProductosPorCategoriaActivos
};
