import mysql from 'mysql2';
import {Router} from 'express';
import validate from '../controllers/bodegasController.js';
const storageGbpBodegas = Router();
let con = undefined;

storageGbpBodegas.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

/* storageGbpBodegas.get("/", (req, res) => {
    con.query(

        `SELECT bodegas.*, users.nombre AS responsable_nombre
        FROM bodegas
        INNER JOIN users ON bodegas.id_responsable = users.id`,
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener las bodegas:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});

storageGbpBodegas.get("/:id", (req, res) => {
    const id = req.params.id;

    con.query(
        `SELECT bodegas.*, users.nombre AS responsable_nombre
        FROM bodegas
        INNER JOIN users ON bodegas.id_responsable = users.id
        WHERE bodegas.id = ?`, [id],
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener la bodega:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
}); */

storageGbpBodegas.post("/", (req, res) => {
    const {id,nombre,id_responsable,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO bodegas (id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at) VALUES (:_ID, :name, :responsable, :activo, :createdBy, :updateBy, :createdAt, :updateAt, :deletedBy)`,
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
storageGbpBodegas.put("/:id", (req, res) => {
    const id = req.params.id;
    const {nombre,id_responsable,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE bodegas SET nombre = :name, id_responsable = :responsable, estado = :activo, created_by = :createdBy, update_by = :updateBy, created_at = :createdAt, updated_at = :updateAt, deleted_at = :deletedBy WHERE id = :_ID`,
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
storageGbpBodegas.delete("/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM bodegas WHERE id = :_ID`,
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

storageGbpBodegas.get("/", validate);

export default storageGbpBodegas;