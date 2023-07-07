import mysql from 'mysql2';
import {Router} from 'express';
import validate from '../controllers/inventariosController.js';
const storageGbpInventarios = Router();
let con = undefined;

storageGbpInventarios.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

/* storageGbpInventarios.get("/", (req, res) => {
    con.query(
        `SELECT inventarios.*, bodegas.nombre AS nombre_bodega, productos.nombre AS nombre_producto 
        FROM inventarios
        INNER JOIN bodegas ON inventarios.id_bodega = bodegas.id
        INNER JOIN productos ON inventarios.id_producto = productos.id`,
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener los inventarios:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});

storageGbpInventarios.get("/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        `SELECT inventarios.*, bodegas.nombre AS nombre_bodega, productos.nombre AS nombre_producto 
        FROM inventarios
        INNER JOIN bodegas ON inventarios.id_bodega = bodegas.id
        INNER JOIN productos ON inventarios.id_producto = productos.id
        WHERE inventarios.id = ?`, [id],
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener el inventario:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
}); */


storageGbpInventarios.post("/", (req, res) => {
    const {id,id_bodega,id_producto,cantidad,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO inventarios (id,id_bodega,id_producto,cantidad,created_by,update_by,created_at,updated_at,deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id,id_bodega,id_producto,cantidad,created_by,update_by,created_at,updated_at,deleted_at],
        (err, result) => {
            if (err) {
                console.error('Error al crear el inventario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageGbpInventarios.put("/:id", (req, res) => {
    const id = req.params.id;
    const {id_bodega,id_producto,cantidad,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE inventarios SET id_bodega = ?, id_producto  = ?, cantidad = ?,created_by = ?,update_by = ?,created_at = ?,updated_at = ?,deleted_at = ? WHERE id =?`,
        [id_bodega,id_producto,cantidad,created_by,update_by,created_at,updated_at,deleted_at,id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el inventario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGbpInventarios.delete("/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM inventarios WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el inventario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

storageGbpInventarios.get("/", validate);

export default storageGbpInventarios;