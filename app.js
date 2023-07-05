import dotenv from 'dotenv';
import express from 'express';
import storageGbp from './routers/bodegas.js';
import storageGbpUsers from './routers/users.js'
dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/gbp", storageGbp);
appExpress.use("/gbp", storageGbpUsers);



const config =JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));
