import mysql from 'mysql2';
import {Router} from 'express';
const storageGbpBodegas = Router();
let con = undefined;

storageGbpBodegas.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpBodegas.get("/bodegas", (req, res) => {
    con.query(
        /*sql*/
        `SELECT * FROM bodegas`,
        (err, data, fil) => {
            res.send(JSON.stringify(data));
        }
    );
})
storageGbpBodegas.get("/bodegas/:id", (req, res) => {
    const id = req.params.id;

    con.query(
        /*sql*/
        `SELECT * FROM bodegas WHERE id = ?`, [id],
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener la bodega:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});

storageGbpBodegas.post("/bodegas", (req, res) => {
    const {id,nombre,id_responsable,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO bodegas (id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at],
        (err, result) => {
            if (err) {
                console.error('Error al crear la bodega:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageGbpBodegas.put("/bodegas/:id", (req, res) => {
    const id = req.params.id;
    const {nombre,id_responsable,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE bodegas SET nombre = ?, id_responsable = ?, estado = ?, created_by = ?, update_by = ?, created_at = ?, updated_at = ?, deleted_at = ? WHERE id = ?`,
        [nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at, id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar la bodega:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGbpBodegas.delete("/bodegas/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM bodegas WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar la bodega:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageGbpBodegas;