import mysql from 'mysql2';
import {Router} from 'express';
import  validate from '../controllers/productosController.js';
const storageGbpProductos = Router();
let con = undefined;

storageGbpProductos.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})
storageGbpProductos.post("/", (req, res) => {
    const {id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `INSERT INTO productos (id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id,nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at],
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
/* storageGbpProductos.post("/productos", (req, res) => {
    const { id, nombre, descripcion, estado, created_by, update_by, created_at, updated_at, deleted_at } = req.body;
    const bodegaDefaultId = 16; // ID de la bodega por defecto
    
    con.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener la conexión:', err.message);
            res.sendStatus(500);
        } else {
            connection.beginTransaction((err) => {
                if (err) {
                    console.error('Error al iniciar la transacción:', err.message);
                    res.sendStatus(500);
                    return;
                }
                
                // Insertar el producto en la tabla de productos
                connection.query(
                    `INSERT INTO productos (id, nombre, descripcion, estado, created_by, update_by, created_at, updated_at, deleted_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [id, nombre, descripcion, estado, created_by, update_by, created_at, updated_at, deleted_at],
                    (err, result) => {
                        if (err) {
                            console.error('Error al crear el producto:', err.message);
                            connection.rollback(() => {
                                res.sendStatus(500);
                            });
                        } else {
                            // Obtener el último ID insertado en la tabla de productos
                            const productoId = result.insertId;
                            
                            // Insertar la cantidad inicial del producto en el inventario de la bodega por defecto
                            connection.query(
                                `INSERT INTO inventarios (id_producto, id_bodega, cantidad) 
                                VALUES (?, ?, ?)`,
                                [productoId, bodegaDefaultId, 0], // Establecer la cantidad inicial en 0
                                (err, result) => {
                                    if (err) {
                                        console.error('Error al asignar la cantidad inicial del producto en el inventario:', err.message);
                                        connection.rollback(() => {
                                            res.sendStatus(500);
                                        });
                                    } else {
                                        connection.commit((err) => {
                                            if (err) {
                                                console.error('Error al confirmar la transacción:', err.message);
                                                connection.rollback(() => {
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
            });
        }
    });
});
storageGbpProductos.post("/trasladar/:productoId", (req, res) => {
    const productoId = req.params.productoId;
    const origenId = req.body.origenId;
    const destinoId = req.body.destinoId;
    const cantidad = req.body.cantidad;
  
    con.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener la conexión:', err.message);
        res.sendStatus(500);
      } else {
        connection.beginTransaction((err) => {
          if (err) {
            console.error('Error al iniciar la transacción:', err.message);
            res.sendStatus(500);
            return;
          }
  
          // Verificar la cantidad disponible en el origen
          connection.query(
            `SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?`,
            [productoId, origenId],
            (err, result) => {
              if (err) {
                console.error('Error al obtener la cantidad en el origen:', err.message);
                connection.rollback(() => {
                  res.sendStatus(500);
                });
              } else {
                const cantidadDisponible = result[0].cantidad;
                if (cantidad > cantidadDisponible) {
                  // La cantidad solicitada es mayor a la disponible en el origen
                  res.status(400).json({ message: 'No hay suficiente cantidad disponible en el origen' });
                  connection.rollback(() => {
                    res.sendStatus(400);
                  });
                  return;
                }
  
                // Actualizar la cantidad en el origen (restar)
                connection.query(
                  `UPDATE inventarios SET cantidad = cantidad - ? WHERE id_producto = ? AND id_bodega = ?`,
                  [cantidad, productoId, origenId],
                  (err, result) => {
                    if (err) {
                      console.error('Error al restar la cantidad del origen:', err.message);
                      connection.rollback(() => {
                        res.sendStatus(500);
                      });
                    } else {
                      // Actualizar la cantidad en el destino (sumar)
                      connection.query(
                        `UPDATE inventarios SET cantidad = cantidad + ? WHERE id_producto = ? AND id_bodega = ?`,
                        [cantidad, productoId, destinoId],
                        (err, result) => {
                          if (err) {
                            console.error('Error al sumar la cantidad en el destino:', err.message);
                            connection.rollback(() => {
                              res.sendStatus(500);
                            });
                          } else {
                            // Registrar el traslado en la tabla de historiales
                            connection.query(
                              `INSERT INTO historiales (id_producto, id_bodega_origen, id_bodega_destino, cantidad) 
                              VALUES (?, ?, ?, ?)`,
                              [productoId, origenId, destinoId, cantidad],
                              (err, result) => {
                                if (err) {
                                  console.error('Error al registrar el traslado en el historial:', err.message);
                                  connection.rollback(() => {
                                    res.sendStatus(500);
                                  });
                                } else {
                                  connection.commit((err) => {
                                    if (err) {
                                      console.error('Error al confirmar la transacción:', err.message);
                                      connection.rollback(() => {
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
            }
          );
        });
      }
    });
  }); */
storageGbpProductos.put("/:id", (req, res) => {
    const id = req.params.id;
    const {nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at} = req.body;
    con.query(
        /*sql*/
        `UPDATE productos SET nombre = ?, descripcion  = ?, estado = ?,created_by = ?,update_by = ?,created_at = ?,updated_at = ?,deleted_at = ? WHERE id = ?`,
        [nombre,descripcion,estado,created_by,update_by,created_at,updated_at,deleted_at,id],
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
    const id = req.params.id;
    con.query(
        /*sql*/
        `DELETE FROM productos WHERE id = ?`,
        [id],
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





/* let validate = (req, res)=>{

    if(!req.query.hasOwnProperty("id") && !req.query.hasOwnProperty("desc")){
        con.query(
            `SELECT productos.*, users.created_by AS created_by, users.update_by AS update_by 
            FROM productos
            INNER JOIN users ON productos.created_by = users.id `,
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener los productos:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }else if(req.query.id){
        const id = req.query.id;
        con.query(
            `SELECT productos.*, users.created_by AS created_by, users.update_by AS update_by 
            FROM productos
            INNER JOIN users ON productos.created_by = users.id 
            WHERE productos.id = ?`, [id],
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener el producto:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }else if(!req.query.desc){
        con.query(
            `SELECT productos.*, SUM(inventarios.cantidad) AS Total
            FROM productos
            INNER JOIN inventarios ON productos.id = inventarios.id_producto
            GROUP BY productos.id
            ORDER BY Total DESC;`,
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener los productos:', err.message);
                    res.sendStatus(500);
                } else {
                    res.json(data);
                }
            }
        );
    }
} */


storageGbpProductos.get("/", validate);


export default storageGbpProductos;