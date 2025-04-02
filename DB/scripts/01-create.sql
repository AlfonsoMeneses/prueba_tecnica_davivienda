-- -----------------------------------------------------
-- Schema prueba_tecnica
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS prueba_tecnica CASCADE;

-- -----------------------------------------------------
-- Schema prueba_tecnica
-- -----------------------------------------------------
CREATE SCHEMA prueba_tecnica;
SET search_path TO prueba_tecnica;

-- -----------------------------------------------------
-- Table prueba_tecnica.Roles
-- -----------------------------------------------------
DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE roles (
  id_role SERIAL PRIMARY KEY,
  code VARCHAR(15) NOT NULL UNIQUE,
  name VARCHAR(45) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table prueba_tecnica.Users
-- -----------------------------------------------------
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id_user SERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  password VARCHAR(150) NOT NULL,
  role_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_user_role_id
    FOREIGN KEY (role_id)
    REFERENCES roles (id_role)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table prueba_tecnica.Products
-- -----------------------------------------------------
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id_product SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(100),
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table prueba_tecnica.CartItems
-- -----------------------------------------------------
DROP TABLE IF EXISTS cart_items CASCADE;

CREATE TABLE cart_items (
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, product_id),
  CONSTRAINT fk_cart_items_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (id_user)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_cart_item_product_id
    FOREIGN KEY (product_id)
    REFERENCES products (id_product)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table prueba_tecnica.Orders
-- -----------------------------------------------------
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id_order SERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_order_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (id_user)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table prueba_tecnica.OrderItems
-- -----------------------------------------------------
DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE order_items (
  id_order_item SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order_item_order_id
    FOREIGN KEY (order_id)
    REFERENCES orders (id_order)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_order_item_product_id
    FOREIGN KEY (product_id)
    REFERENCES products (id_product)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);