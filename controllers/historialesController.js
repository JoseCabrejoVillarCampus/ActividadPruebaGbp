import mysql from 'mysql2';
const validate = (req, res)=>{
    const myConfig = JSON.parse(process.env.MY_CONNECT);
    const con = mysql.createPool(myConfig)

    if(!req.query.hasOwnProperty("id")){
        con.query(
            `SELECT historiales.*, users.created_by AS created_by, users.update_by AS update_by, inventarios.id AS id_inventario 
            FROM historiales
            INNER JOIN users ON historiales.created_by = users.id
            INNER JOIN inventarios ON historiales.id_inventario = inventarios.id`,
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener los historiales:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }else if(req.query.id){
        const id = req.params.id;
        con.query(
            `SELECT historiales.*, users.created_by AS created_by, users.update_by AS update_by, inventarios.id AS id_inventario 
            FROM historiales
            INNER JOIN users ON historiales.created_by = users.id
            INNER JOIN inventarios ON historiales.id_inventario = inventarios.id 
            WHERE historiales.id = ?`, [id],
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener el historial:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }
}
export default validate