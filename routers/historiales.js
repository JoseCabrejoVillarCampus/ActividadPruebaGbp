import mysql from 'mysql2';
import {Router} from 'express';
const storageGbpHistoriales = Router();
let con = undefined;

storageGbpHistoriales.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpHistoriales.get("/historiales", (req, res) => {
    con.query(
        /*sql*/
        `SELECT historiales.*, users.created_by AS created_by, users.update_by AS update_by, inventarios.id AS id_inventario 
        FROM historiales
        INNER JOIN users ON historiales.created_by = users.id
        INNER JOIN inventarios ON historiales.id_inventario = inventarios.id`,
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener los historiales:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});


storageGbpHistoriales.get("/historiales/:id", (req, res) => {
    const id = req.params.id;

    con.query(
        /*sql*/
        `SELECT historiales.*, users.created_by AS created_by, users.update_by AS update_by, inventarios.id AS id_inventario 
        FROM historiales
        INNER JOIN users ON historiales.created_by = users.id
        INNER JOIN inventarios ON historiales.id_inventario = inventarios.id 
        WHERE historiales.id = ?`, [id],
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener el historial:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});


storageGbpHistoriales.post("/historiales", (req, res) => {
    const {id,cantidad,id_bodega_origen,id_bodega_destino,id_inventario,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO historiales (id,cantidad,id_bodega_origen,id_bodega_destino,id_inventario,estado,created_by,update_by,created_at,updated_at,deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id,cantidad,id_bodega_origen,id_bodega_destino,id_inventario,estado,created_by,update_by,created_at,updated_at,deleted_at],
        (err, result) => {
            if (err) {
                console.error('Error al crear el historial:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageGbpHistoriales.put("/historiales/:id", (req, res) => {
    const id = req.params.id;
    const {cantidad,id_bodega_origen,id_bodega_destino,id_inventario,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE historiales SET cantidad = ?,id_bodega_origen = ?,id_bodega_destino = ?,id_inventario = ?,estado = ?,created_by = ?,update_by = ?,created_at = ?,updated_at = ?,deleted_at = ? WHERE id = ?`,
        [cantidad,id_bodega_origen,id_bodega_destino,id_inventario,estado,created_by,update_by,created_at,updated_at,deleted_at,id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el historial:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGbpHistoriales.delete("/historiales/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM historiales WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el historial:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageGbpHistoriales;