import mysql from 'mysql2';
import { Router } from 'express';

const storageGbpTraslados = Router();
let con = undefined;

storageGbpTraslados.use((req, res, next) => {
  let myConfig = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(myConfig);
  next();
});

storageGbpTraslados.post("/traslados", (req, res) => {
  const { productoId, cantidad, bodegaOrigenId, bodegaDestinoId } = req.body;

  // Validar la cantidad de unidades disponibles en la bodega de origen
  con.query(
    `SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?`,
    [productoId, bodegaOrigenId],
    (err, result) => {
      if (err) {
        console.error('Error al obtener la cantidad de unidades:', err.message);
        res.sendStatus(500);
      } else {
        const unidadesDisponibles = result[0].cantidad;

        if (cantidad > unidadesDisponibles) {
          res.status(400).json({ message: 'La cantidad solicitada es mayor a las unidades disponibles en la bodega de origen.' });
        } else {
          // Actualizar las cantidades en las bodegas de origen y destino
          const unidadesRestantes = unidadesDisponibles - cantidad;
          con.query(
            `UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?`,
            [unidadesRestantes, productoId, bodegaOrigenId],
            (err, result) => {
              if (err) {
                console.error('Error al actualizar la cantidad en la bodega de origen:', err.message);
                res.sendStatus(500);
              } else {
                con.query(
                  `SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?`,
                  [productoId, bodegaDestinoId],
                  (err, result) => {
                    if (err) {
                      console.error('Error al obtener la cantidad de unidades en la bodega de destino:', err.message);
                      res.sendStatus(500);
                    } else {
                      const unidadesDestino = result[0].cantidad;
                      const unidadesNuevas = unidadesDestino + cantidad;

                      con.query```
                      `UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?`,
                      [unidadesNuevas, productoId, bodegaDestinoId],
                      (err, result) => {
                        if (err) {
                          console.error('Error al actualizar la cantidad en la bodega de destino:', err.message);
                          res.sendStatus(500);
                        } else {
                          // Registrar el traslado en la tabla de historiales
                          const currentDate = new Date().toISOString();
                          con.query(
                            `INSERT INTO historiales (cantidad, id_bodega_origen, id_bodega_destino, id_inventario, estado, created_by, update_by, created_at, update_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                            [cantidad, bodegaOrigenId, bodegaDestinoId, productoId, 1, 1, 1, currentDate, currentDate, null],
                            (err, result) => {
                              if (err) {
                                console.error('Error al registrar el traslado en la tabla de historiales:', err.message);
                                res.sendStatus(500);
                              } else {
                                res.sendStatus(200);
                              }
                            }
                          );
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
    }
  );
});

export default storageGbpTraslados;
