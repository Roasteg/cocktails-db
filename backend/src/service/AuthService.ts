import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Message from "../models/Response";
require("dotenv").config();

const privateAccessTokenKey = `${process.env.JWT_KEY}`;

const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = <string>req.headers["authorization"];
    let jwtPayload;
    try {
        jwtPayload = <jwt.JwtPayload>jwt.verify(token, privateAccessTokenKey);
        res.locals.jwtPayload = jwtPayload;
    }catch(error) {
        return res.status(401).send();
    }
    next();
}

const verifyId = (req: Request, res: Response, next: NextFunction) => {
    if(res.locals.jwtPayload.userId !== req.body.userId) {
        return res.status(401).json(new Message("You can't add to favourites for someone else!", 401));
    }
    next();
}

export { verifyToken, verifyId };