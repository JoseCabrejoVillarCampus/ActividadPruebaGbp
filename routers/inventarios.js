import mysql from 'mysql2';
import {Router} from 'express';
import proxyInventarios from '../middleware/middlewareInventarios.js';
const storageGbpInventarios = Router();
let con = undefined;

storageGbpInventarios.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpInventarios.get("/:id?", proxyInventarios , (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM inventarios WHERE ?`, req.params]
        : [`SELECT * FROM inventarios`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})
storageGbpInventarios.post("/", proxyInventarios ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO inventarios SET ?`,
        req.body,
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
    con.query(
        /*sql*/
        `UPDATE inventarios SET ? WHERE id = ?`,
        [req.body, req.params.id],
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
    con.query(
        /*sql*/
        `DELETE FROM inventarios WHERE  ?`,
        req.params,
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