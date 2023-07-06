import mysql from 'mysql2';
const validate = (req, res)=>{
    const myConfig = JSON.parse(process.env.MY_CONNECT);
    const con = mysql.createPool(myConfig)

    if(!req.query.hasOwnProperty("id")){
        con.query(
            `SELECT inventarios.*, bodegas.nombre AS nombre_bodega, productos.nombre AS nombre_producto 
            FROM inventarios
            INNER JOIN bodegas ON inventarios.id_bodega = bodegas.id
            INNER JOIN productos ON inventarios.id_producto = productos.id`,
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener los inventarios:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }else if(req.query.id){
        const id = req.params.id;
        con.query(
            `SELECT inventarios.*, bodegas.nombre AS nombre_bodega, productos.nombre AS nombre_producto 
            FROM inventarios
            INNER JOIN bodegas ON inventarios.id_bodega = bodegas.id
            INNER JOIN productos ON inventarios.id_producto = productos.id
            WHERE inventarios.id = ?`, [id],
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener el inventario:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }
}
export default validate