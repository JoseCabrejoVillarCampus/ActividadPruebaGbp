import mysql from 'mysql2';
const validate = (req, res)=>{
    const myConfig = JSON.parse(process.env.MY_CONNECT);
    const con = mysql.createPool(myConfig)
    

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
}
export default validate
