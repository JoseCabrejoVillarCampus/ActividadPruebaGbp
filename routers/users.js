import mysql from 'mysql2';
import {Router} from 'express';
import proxyUsers from '../middleware/middlewareUsers.js';
const storageGbpUsers = Router();
let con = undefined;

storageGbpUsers.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpUsers.get("/:id?", proxyUsers , (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM users WHERE ?`, req.params]
        : [`SELECT * FROM users`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})


storageGbpUsers.post("/", proxyUsers ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO users SET ?`,
        req.body,
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
storageGbpUsers.put("/:id", proxyUsers ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE users SET  ? WHERE id = ?`,
        [req.body, req.params.id],
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
storageGbpUsers.delete("/:id", proxyUsers ,(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM users WHERE ?`,
        req.params,
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