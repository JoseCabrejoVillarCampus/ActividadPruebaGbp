import mysql from 'mysql2';
const validate = (req, res)=>{
    const myConfig = JSON.parse(process.env.MY_CONNECT);
    const con = mysql.createPool(myConfig)

    if(!req.query.hasOwnProperty("id")){
        con.query(
            `SELECT * FROM users`,
            (err, data, fil) => {
                res.send(JSON.stringify(data));
            }
        );
    }else if(req.query.id){
        const id = req.query.id;
        con.query(
            `SELECT users.*, WHERE users.id = ?`, [id],
            (err, data, fil) => {
                if (err) {
                    console.error('Error al obtener el usuario:', err.message);
                    res.sendStatus(500);
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        );
    }
}
export default validate