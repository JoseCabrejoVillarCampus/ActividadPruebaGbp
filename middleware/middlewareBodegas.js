import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {bodegasDTO} from "../dtocontroller/bodegas.js"

const proxyBodegas = express();
proxyBodegas.use((req,res,next)=>{
    try {
        let data = plainToClass(bodegasDTO, req.body, { excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyBodegas;