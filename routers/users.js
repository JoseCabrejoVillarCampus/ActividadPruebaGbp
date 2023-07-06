import mysql from 'mysql2';
import {Router} from 'express';
const storageGbpUsers = Router();
let con = undefined;

storageGbpUsers.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpUsers.get("/users", (req, res) => {
    con.query(
        /*sql*/
        `SELECT * FROM users`,
        (err, data, fil) => {
            res.send(JSON.stringify(data));
        }
    );
})
storageGbpUsers.get("/users/:id", (req, res) => {
    const id = req.params.id;

    con.query(
        /*sql*/
        `SELECT * FROM users WHERE id = ?`, [id],
        (err, data, fil) => {
            if (err) {
                console.error('Error al obtener el usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(data));
            }
        }
    );
});

storageGbpUsers.post("/users", (req, res) => {
    const {id,nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO users (id,nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id,nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at],
        (err, result) => {
            if (err) {
                console.error('Error al crear el usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageGbpUsers.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const {nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE users SET nombre = ?, email  = ?,email_verified_at = ?,estado = ?,created_by = ?,update_by = ?,foto = ?,password = ?,created_at = ?,updated_at = ?,deleted_at = ? WHERE id = ?`,
        [nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at,id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGbpUsers.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM users WHERE id = ?`,
        [id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageGbpUsers;