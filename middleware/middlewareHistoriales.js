import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {historialesDTO} from "../dtocontroller/historiales.js"

const proxyHistoriales = express();
proxyHistoriales.use((req,res,next)=>{
    try {
        let data = plainToClass(historialesDTO, req.body, { excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyHistoriales;