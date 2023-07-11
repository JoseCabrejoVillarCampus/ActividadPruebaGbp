import mysql from 'mysql2';
import {Router} from 'express';
import proxyHistoriales from '../middleware/middlewareHistoriales.js';
const storageGbpHistoriales = Router();
let con = undefined;

storageGbpHistoriales.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpHistoriales.get("/:id?", proxyHistoriales , (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM historiales WHERE ?`, req.params]
        : [`SELECT * FROM historiales`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageGbpHistoriales.post("/" ,proxyHistoriales ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO historiales SET ?`,
        req.body,
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
storageGbpHistoriales.put("/:id", proxyHistoriales ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE historiales SET ? WHERE id = ?`,
        [req.body, req.params.id],
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
storageGbpHistoriales.delete("/:id", proxyHistoriales ,(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM historiales WHERE ?`,
        req.params,
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