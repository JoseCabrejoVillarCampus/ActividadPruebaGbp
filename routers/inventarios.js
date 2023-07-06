import mysql from 'mysql2';
import {Router} from 'express';
const storageGbpInventarios = Router();
let con = undefined;

storageGbpInventarios.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpInventarios.get("/inventarios", (req, res) => {
    con.query(
        /*sql*/
        `SELECT * FROM inventarios`,
        (err, data, fil) => {
            res.send(JSON.stringify(data));
        }
    );
})
storageGbpInventarios.get("/inventarios/:id", (req, res) => {
    const id = req.params.id;

    con.query(
        /*sql*/
        `SELECT * FROM inventarios WHERE id = ?`, [id],
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener el inventario:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});

storageGbpInventarios.post("/inventarios", (req, res) => {
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
storageGbpInventarios.put("/inventarios/:id", (req, res) => {
    const id = req.params.id;
    const {id_bodega,id_producto,cantidad,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE inventarios SET id_bodega = ?, id_producto  = ?, cantidad = ?,created_by = ?,update_by = ?,created_at = ?,updated_at = ?,deleted_at = ? WHERE id = ?`,
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
storageGbpInventarios.delete("/inventarios/:id", (req, res) => {
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


export default storageGbpInventarios;