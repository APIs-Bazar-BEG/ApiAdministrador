-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS bazarBEG_Administrador;
USE bazarBEG_Administrador;

-- Tabla: categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    imagen_url VARCHAR(255)
);

-- Tabla: productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen_url VARCHAR(255),
    categoria_id INT,
    status INT NOT NULL DEFAULT 1,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabla: pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('PENDIENTE','ENVIADO','ENTREGADO') NOT NULL DEFAULT 'PENDIENTE',
    total DECIMAL(10,2) NOT NULL
);

-- Tabla: detalle_pedido
CREATE TABLE detalle_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
