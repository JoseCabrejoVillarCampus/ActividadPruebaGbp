import dotenv from 'dotenv';
import express from 'express';
import storageGbpBodegas from './routers/bodegas.js';
import storageGbpUsers from './routers/users.js'
import storageGbpProductos from './routers/productos.js';
import storageGbpInventarios from './routers/inventarios.js';
import storageGbpHistoriales from './routers/historiales.js';
dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/bodegas", storageGbpBodegas);
appExpress.use("/users", storageGbpUsers);
appExpress.use("/productos", storageGbpProductos);
appExpress.use("/inventarios", storageGbpInventarios);
appExpress.use("/historiales", storageGbpHistoriales);


const config =JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));
