import mysql from 'mysql2';
import {Router} from 'express';
import proxyBodegas from '../middleware/middlewareBodegas.js'
const storageGbpBodegas = Router();
let con = undefined;

storageGbpBodegas.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpBodegas.get("/:id?", proxyBodegas , (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM bodegas WHERE ?`, req.params]
        : [`SELECT * FROM bodegas`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageGbpBodegas.post("/", proxyBodegas ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO bodegas SET ?`,
        req.body,
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


storageGbpBodegas.put("/:id", proxyBodegas ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE bodegas SET ?  WHERE id = ?`,
        [req.body, req.params.id],
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
storageGbpBodegas.delete("/:id", proxyBodegas ,(req, res) => {
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