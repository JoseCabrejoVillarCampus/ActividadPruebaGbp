# API Endpoints

Esta API proporciona varios endpoints para interactuar con diferentes recursos, como usuarios, productos, bodegas, historiales, entre otros. A continuación se detalla cómo funciona cada Router y cómo consumirlos.

### Router: Users

Listar todos los usuarios
Método: GET
Endpoint: /users
Descripción: Este endpoint devuelve todos los usuarios registrados en el sistema.

---

Obtener un usuario por su ID
Método: GET
Endpoint: /users/:id
Descripción: Este endpoint devuelve un usuario específico según su ID.
Parámetros de ruta:
id (integer): El ID del usuario a obtener.

---

Crear un nuevo usuario
Método: POST
Endpoint: /users
Descripción: Este endpoint permite crear un nuevo usuario.
Parámetros de solicitud:
nombre (string): El nombre del usuario.
email (string): El correo electrónico del usuario.
password (string): La contraseña del usuario.

---

Actualizar un usuario existente
Método: PUT
Endpoint: /users/:id
Descripción: Este endpoint permite actualizar los datos de un usuario existente.
Parámetros de ruta:
id (integer): El ID del usuario a actualizar.
Parámetros de solicitud:
nombre (string): El nuevo nombre del usuario.
email (string): El nuevo correo electrónico del usuario.

---

Eliminar un usuario
Método: DELETE
Endpoint: /users/:id
Descripción: Este endpoint permite eliminar un usuario existente.
Parámetros de ruta:
id (integer): El ID del usuario a eliminar.

## Router: Productos

Listar todos los productos

---

Método: GET
Endpoint: /productos
Descripción: Este endpoint devuelve todos los productos disponibles en el sistema.

---

Obtener un producto por su ID
Método: GET
Endpoint: /productos/:id
Descripción: Este endpoint devuelve un producto específico según su ID.
Parámetros de ruta:
id (integer): El ID del producto a obtener.

---

Crear un nuevo producto
Método: POST
Endpoint: /productos
Descripción: Este endpoint permite crear un nuevo producto.
Parámetros de solicitud:
nombre (string): El nombre del producto.
descripcion (string): La descripción del producto.
estado (integer): El estado del producto.

---

Actualizar un producto existente
Método: PUT
Endpoint: /productos/:id
Descripción: Este endpoint permite actualizar los datos de un producto existente.
Parámetros de ruta:
id (integer): El ID del producto a actualizar.
Parámetros de solicitud:
nombre (string): El nuevo nombre del producto.
descripcion (string): La nueva descripción del producto.
estado (integer): El nuevo estado del producto.

---

Eliminar un producto
Método: DELETE
Endpoint: /productos/:id
Descripción: Este endpoint permite eliminar un producto existente.
Parámetros de ruta:
id (integer): El ID del producto a eliminar.

|COLUMNA 1 | CONUMNA 2|
|---|---|
|FILA 1| FILA 1|
|FILA 2 | FILA 2|


```javascript
storageGbpProductos.post("/", (req, res) => {
    const {id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO productos (id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at],
        (err, result) => {
            if (err) {
                console.error('Error al crear el producto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
```