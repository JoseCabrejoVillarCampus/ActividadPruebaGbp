import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {usersDTO} from "../dtocontroller/users.js"

const proxyUsers = express();
proxyUsers.use((req,res,next)=>{
    try {
        let data = plainToClass(usersDTO, req.body, { excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyUsers;