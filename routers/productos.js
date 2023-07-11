import mysql from 'mysql2';
import {Router} from 'express';
import proxyProductos from '../middleware/middlewareProductos.js';
const storageGbpProductos = Router();
let con = undefined;

storageGbpProductos.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGbpProductos.get("/:id?", proxyProductos , (req,res)=>{
  let sql = (req.params.id)
      ? [`SELECT * FROM productos WHERE ?`, req.params]
      : [`SELECT * FROM productos`];
  con.query(...sql,
      (err, data, fie)=>{
          res.send(data);
      }
  );
})

storageGbpProductos.post("/", proxyProductos ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO productos SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear el producto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});

storageGbpProductos.put("/:id", (req, res) => {
    con.query(
        /*sql*/
        `UPDATE productos SET ? WHERE id = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el producto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGbpProductos.delete("/:id", (req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM productos WHERE ?`,
        req.params,
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el producto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageGbpProductos;