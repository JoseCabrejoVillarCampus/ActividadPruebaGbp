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

storageGbpProductos.get("/:id?", proxyProductos, (req, res) => {
  if (req.params.id === "desc") {
    con.query(
      `SELECT productos.*, SUM(inventarios.cantidad) AS Total
      FROM productos
      LEFT JOIN inventarios ON productos.id = inventarios.id_producto
      GROUP BY productos.id
      ORDER BY Total DESC`,
      (err, data, fil) => {
        if (err) {
          console.error('Error al obtener los productos:', err.message);
          res.sendStatus(500);
        } else {
          res.json(data);
        }
      }
    );
  } else {
    let sql = (req.params.id)
      ? [`SELECT * FROM productos WHERE ?`, req.params]
      : [`SELECT * FROM productos`];
    con.query(...sql,
      (err, data, fie) => {
        res.send(data);
      }
    );
  }
});

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

storageGbpProductos.post("/traslado", proxyProductos, (req, res) => {
  const { id_producto, id_bodega_origen, id_bodega_destino, cantidad } = req.body;

  // Obtener la cantidad actual del producto en la bodega de origen
  con.query(
    `SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?`,
    [id_producto, id_bodega_origen],
    (err, rows) => {
      if (err) {
        console.error('Error al obtener la cantidad del producto en la bodega de origen:', err.message);
        res.sendStatus(500);
      } else {
        const cantidadDisponible = rows[0].cantidad;

        if (cantidad > cantidadDisponible) {
          // La cantidad solicitada es mayor a la cantidad disponible en la bodega de origen
          res.status(400).json({ error: 'No hay suficientes unidades disponibles en la bodega de origen.' });
        } else {
          // Realizar el traslado
          con.beginTransaction((err) => {
            if (err) {
              console.error('Error al iniciar la transacción:', err.message);
              res.sendStatus(500);
            } else {
              // Restar la cantidad del producto de la bodega de origen
              con.query(
                `UPDATE inventarios SET cantidad = cantidad - ? WHERE id_producto = ? AND id_bodega = ?`,
                [cantidad, id_producto, id_bodega_origen],
                (err, result) => {
                  if (err) {
                    con.rollback(() => {
                      console.error('Error al restar la cantidad del producto en la bodega de origen:', err.message);
                      res.sendStatus(500);
                    });
                  } else {
                    // Sumar la cantidad del producto a la bodega de destino
                    con.query(
                      `UPDATE inventarios SET cantidad = cantidad + ? WHERE id_producto = ? AND id_bodega = ?`,
                      [cantidad, id_producto, id_bodega_destino],
                      (err, result) => {
                        if (err) {
                          con.rollback(() => {
                            console.error('Error al sumar la cantidad del producto en la bodega de destino:', err.message);
                            res.sendStatus(500);
                          });
                        } else {
                          // Registrar el traslado en la tabla de historiales
                          con.query(
                            `INSERT INTO historiales (cantidad, id_bodega_origen, id_bodega_destino, id_inventario, estado, created_by, update_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                            [cantidad, id_bodega_origen, id_bodega_destino, id_producto, 1, 1, 1],
                            (err, result) => {
                              if (err) {
                                con.rollback(() => {
                                  console.error('Error al registrar el traslado en la tabla de historiales:', err.message);
                                  res.sendStatus(500);
                                });
                              } else {
                                con.commit((err) => {
                                  if (err) {
                                    con.rollback(() => {
                                      console.error('Error al confirmar la transacción:', err.message);
                                      res.sendStatus(500);
                                    });
                                  } else {
                                    res.sendStatus(201);
                                  }
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
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