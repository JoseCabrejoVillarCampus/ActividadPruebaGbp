import mysql from 'mysql2';
import {Router} from 'express';
const storageGbpProductos = Router();
let con = undefined;

storageGbpProductos.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpProductos.get("/productos", (req, res) => {
    con.query(
        /*sql*/
        `SELECT productos.*, users.created_by AS created_by, users.update_by AS update_by 
        FROM productos
        INNER JOIN users ON productos.created_by = users.id `,
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener los productos:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});

storageGbpProductos.get("/productos/:id", (req, res) => {
    const id = req.params.id;

    con.query(
        /*sql*/
        `SELECT productos.*, users.created_by AS created_by, users.update_by AS update_by 
        FROM productos
        INNER JOIN users ON productos.created_by = users.id 
        WHERE productos.id = ?`, [id],
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener el producto:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});


storageGbpProductos.post("/productos", (req, res) => {
    const {id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO productos (id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at) VALUES (:_ID, :name, :description, :activity, :createdBy, :updatedBy, :createdAt, :updateAt, :deleteBy)`,
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
storageGbpProductos.put("/productos/:id", (req, res) => {
    const id = req.params.id;
    const {nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE productos SET nombre = :name, descripcion  = :description, estado = :activity,created_by = :createdBy,update_by = :updatedBy,created_at = :createdAt,updated_at = :updateAt,deleted_at = :deleteBy WHERE id = :_ID`,
        [nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at,id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el producto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGbpProductos.delete("/productos/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM productos WHERE id = :_ID`,
        [id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el producto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageGbpProductos;