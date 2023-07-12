# API Endpoints

Esta API proporciona varios endpoints para interactuar con diferentes recursos, como usuarios, productos, bodegas, historiales, entre otros. A continuación se detalla cómo funciona cada Router y cómo consumirlos.

## Tecnologias Implementadas

<img src="img/nodejs-1-logo.svg" alt="MySQL Logo" width="100">
<img src="img/Unofficial_JavaScript_logo_2.svg.png" alt="MySQL Logo" width="100">
<img src="img/mysql-logo.svg" alt="MySQL Logo" width="100">
<img src="img/nodemon.svg" alt="MySQL Logo" width="100">
<img src="img/Typescript_logo_2020.svg.png" alt="MySQL Logo" width="100">
<img src="img/2560px-Npm-logo.svg.png" alt="MySQL Logo" width="100">

# Dependencias Implementadas

Express
class-transformer
reflect-metadata
mysql2
dotenv
nodemon
typescript

# Instalacion

Inicializamos en consola
```
npm init -y
```
instalamos nodemon
```
npm i -E -D nodemon
```
instalamos express
```
npm i -E -D express
```
instalamos dotenv
```
npm i -E -D dotenv
```
instalamos mysql2
```
npm i -E -D mysql2
```
instalamos class-transformer
```
npm i -E -D class-transformer
```
instalamos reflect-metadata
```
npm i -E -D reflect-metadata
```
instalamos typescript
```
npm i -E -D typescript
```

## Configuracion del .env

```
MY_CONFIG={"hostname": "", "port":}
MY_CONNECT={"host":"localhost","user":"","database":"","password":"","port":}

```

## Configuracion del tsconfig

```
{
    "compilerOptions":{
        "target":"es6",
        "module":"ES6",
        "moduleResolution":"node",
        "outDir":"./dtocontroller",
        "esModuleInterop":true,
        "experimentalDecorators":true,
        "emitDecoratorMetadata": true
    }
}
```

### Router: Users

Listar todos los usuarios
Método: GET
```
Endpoint: http://127.9.63.21:5012/users
```
Descripción: Este endpoint devuelve todos los usuarios registrados en el sistema.

---

Obtener un usuario por su ID
Método: GET
```
Endpoint: http://127.9.63.21:5012/users/:id
```
Descripción: Este endpoint devuelve un usuario específico según su ID.
Parámetros de ruta:
id (integer): El ID del usuario a obtener.

---

Crear un nuevo usuario
Método: POST
```
Endpoint: http://127.9.63.21:5012/users
```
Descripción: Este endpoint permite crear un nuevo usuario.
Parámetros de solicitud:
nombre (string): El nombre del usuario.
email (string): El correo electrónico del usuario.
password (string): La contraseña del usuario.

---

Actualizar un usuario existente
Método: PUT
```
Endpoint: http://127.9.63.21:5012/users/:id
```
Descripción: Este endpoint permite actualizar los datos de un usuario existente.
Parámetros de ruta:
id (integer): El ID del usuario a actualizar.
Parámetros de solicitud:
nombre (string): El nuevo nombre del usuario.
email (string): El nuevo correo electrónico del usuario.

---

Eliminar un usuario
Método: DELETE
```
Endpoint: http://127.9.63.21:5012/users/:id
```
Descripción: Este endpoint permite eliminar un usuario existente.
Parámetros de ruta:
id (integer): El ID del usuario a eliminar.

## Router: Productos

Listar todos los productos

---

Método: GET
```
Endpoint: http://127.9.63.21:5012/productos
```
Descripción: Este endpoint devuelve todos los productos disponibles en el sistema.

---

Obtener un producto por su ID
Método: GET
```
Endpoint: http://127.9.63.21:5012/productos/:id
```
Descripción: Este endpoint devuelve un producto específico según su ID.
Parámetros de ruta:
id (integer): El ID del producto a obtener.

---

Crear un nuevo producto
Método: POST
```
Endpoint: http://127.9.63.21:5012/productos
```
Descripción: Este endpoint permite crear un nuevo producto.
Parámetros de solicitud:
nombre (string): El nombre del producto.
descripcion (string): La descripción del producto.
estado (integer): El estado del producto.

---

Actualizar un producto existente
Método: PUT
```
Endpoint: http://127.9.63.21:5012/productos/:id
```
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
```
Endpoint: http://127.9.63.21:5012/productos/:id
```
Descripción: Este endpoint permite eliminar un producto existente.
Parámetros de ruta:
id (integer): El ID del producto a eliminar.

---

Traslado de un producto

Método: POST
```
Endpoint: http://127.9.63.21:5012/productos/traslado
```
Descripción: Este endpoint permite trasladar un producto entre bodegas.
Parámetros de solicitud:
nombre (string): El nombre del producto.
descripcion (string): La descripción del producto.
estado (integer): El estado del producto.

```
```
