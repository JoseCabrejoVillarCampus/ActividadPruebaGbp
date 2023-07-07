import mysql from 'mysql2';
const validate = (req, res)=>{
    const myConfig = JSON.parse(process.env.MY_CONNECT);
    const con = mysql.createPool(myConfig)

    if(!req.query.hasOwnProperty("id")){
        con.query(
            `SELECT bodegas.*, users.nombre AS responsable_nombre
            FROM bodegas
            INNER JOIN users ON bodegas.id_responsable = users.id`,
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener las bodegas:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }else if(req.query.id){
        const id = req.query.id;
        con.query(
            `SELECT bodegas.*, users.nombre AS responsable_nombre
            FROM bodegas
            INNER JOIN users ON bodegas.id_responsable = users.id
            WHERE bodegas.id = ?`, [id],
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener la bodega:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
    );
    }
}
export default validate