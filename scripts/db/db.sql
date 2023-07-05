-- Active: 1688558222943@@localhost@3306
CREATE DATABASE pruebagbp;
USE pruebagbp;

CREATE TABLE users(
    id BIGINT(20) UNSIGNED,
    nombre varchar(225),
    email VARCHAR(225),
    email_verified_at TIMESTAMP,
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    foto VARCHAR(225),
    password VARCHAR(225),
    created_at TIMESTAMP,
    update_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE productos(
    id BIGINT(20) UNSIGNED,
    nombre varchar(225),
    descripcion VARCHAR(225),
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    update_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE inventarios(
    id BIGINT(20) UNSIGNED,
    id_bodega BIGINT(20) UNSIGNED,
    id_producto BIGINT(20) UNSIGNED,
    cantidad INT(11),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    update_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE bodegas(
    id BIGINT(20) UNSIGNED,
    cantidad INT(11),
    id_bodega_origen BIGINT(20) UNSIGNED,
    id_bodega_destino BIGINT(20) UNSIGNED,
    id_inventario BIGINT(20) UNSIGNED,
    estado TINYINT(11),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    update_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE historiales(
    id BIGINT(20) UNSIGNED,
    nombre VARCHAR(225),
    id_responsable BIGINT(20) UNSIGNED,
    estado TINYINT(11),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    update_at TIMESTAMP,
    deleted_at TIMESTAMP
);

/*  
?CREAMOS LAS PK PARA LAS TABLAS
*/
ALTER TABLE users ADD CONSTRAINT id PRIMARY KEY (id);
ALTER TABLE productos ADD CONSTRAINT id PRIMARY KEY (id);
ALTER TABLE inventarios ADD CONSTRAINT id PRIMARY KEY (id);
ALTER TABLE bodegas ADD CONSTRAINT id PRIMARY KEY (id);
ALTER TABLE historiales ADD CONSTRAINT id PRIMARY KEY (id);

/*  
?MMODIFICAMOS LOS CAMPOS UNICOS PARA LA TABLA INVENTARIOS
*/

ALTER TABLE inventarios MODIFY COLUMN id_bodega BIGINT(20) UNSIGNED UNIQUE;
ALTER TABLE inventarios MODIFY COLUMN id_producto BIGINT(20) UNSIGNED UNIQUE;
ALTER TABLE historiales RENAME COLUMN id_responsable to id_inventario;
ALTER TABLE inventarios DROP COLUMN id_inventario;
/*  
?AGREGAMOS LAS FOREIGN KEYS Y LAS RELACIONES
*/
ALTER TABLE inventarios
    ADD CONSTRAINT id FOREIGN KEY (id_bodega) REFERENCES bodegas(id);

ALTER TABLE inventarios
    ADD CONSTRAINT id_pro FOREIGN KEY (id_producto) REFERENCES productos(id);

ALTER TABLE inventarios
    ADD CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES users(id);

ALTER TABLE inventarios
    ADD CONSTRAINT updated_by_invetarios FOREIGN KEY (update_by) REFERENCES users(id);

ALTER TABLE productos
    ADD CONSTRAINT create_by_productos FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE productos
    ADD CONSTRAINT updated_by_productos FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE bodegas
    ADD CONSTRAINT create_by_bodegas FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE bodegas
    ADD CONSTRAINT updated_by_bodegas FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE bodegas
    ADD CONSTRAINT id_responsable FOREIGN KEY (id_responsable) REFERENCES users(id);

ALTER TABLE bodegas
    ADD CONSTRAINT create_by_bodegas FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE bodegas
    ADD CONSTRAINT updated_by_bodegas FOREIGN KEY (update_by) REFERENCES users(id);

ALTER TABLE historiales
    ADD CONSTRAINT create_by_historiales FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE historiales
    ADD CONSTRAINT updated_by_historiales FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE historiales
    ADD CONSTRAINT id_invetario FOREIGN KEY (id_inventario) REFERENCES inventarios(id);