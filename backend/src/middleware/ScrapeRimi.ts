import { Request, Response, NextFunction } from "express";

function scrapeRimi(req: Request, res: Response, next: NextFunction){
    next();
}

export default scrapeRimi;