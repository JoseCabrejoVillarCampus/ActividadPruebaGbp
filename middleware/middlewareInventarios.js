import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {inventariosDTO} from "../dtocontroller/inventarios.js"

const proxyInventarios = express();
proxyInventarios.use((req,res,next)=>{
    try {
        let data = plainToClass(inventariosDTO, req.body, { excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyInventarios;