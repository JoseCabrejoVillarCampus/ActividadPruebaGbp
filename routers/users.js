import mysql from 'mysql2';
import {Router} from 'express';
import validate from '../controllers/usersController.js';
const storageGbpUsers = Router();
let con = undefined;

storageGbpUsers.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpUsers.get("/", (req, res) => {
    con.query(
        `SELECT * FROM users`,
        (err, data, fil) => {
            res.send(JSON.stringify(data));
        }
    );
})
storageGbpUsers.get("/:id", (req, res) => {
    const id = req.params.id;

    con.query(
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

storageGbpUsers.post("/", (req, res) => {
    const {id,nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO users (id,nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at) VALUES (:_ID, :name, :Email, :verification, :activo, :createdBy, :updateBy, :photo, :pass_word, :createdAt, :updateAt, :deletedAt)`,
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
storageGbpUsers.put("/:id", (req, res) => {
    const id = req.params.id;
    const {nombre,email,email_verified_at,estado,created_by,update_by,foto,password,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE users SET nombre = :name, email  = :Email,email_verified_at = :verification,estado = :activo,created_by = :createdBy,update_by = :updateBy,foto = :photo,password = :pass_word,created_at = :createdAt,updated_at = :updateAt,deleted_at = :deletedAt WHERE id = :_ID`,
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
storageGbpUsers.delete("/:id", (req, res) => {
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM users WHERE id = _ID`,
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

storageGbpUsers.get("/", validate);

export default storageGbpUsers;