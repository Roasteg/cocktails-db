import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

const privateAccessTokenKey = `${process.env.JWT_KEY}`;

const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = <string>req.headers["authorization"];

    let jwtPayload;
    try {
        jwtPayload = <jwt.JwtPayload>jwt.verify(token, privateAccessTokenKey);
        res.locals.jwtPaylaoad = jwtPayload;
    }catch(error) {
        return res.status(401).send();
    }

    next();
}

export { verifyToken };