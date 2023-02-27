import axios from "axios";
import createDom from "./CreateDom";

import { Request, Response, NextFunction } from "express";

function fetchPrisma(name: string) {
    const response = axios.get(`https://www.prismamarket.ee/products/search/${name}`).then((data) => {
        return data.data;
    })
    return response;
}

async function scrapePrisma(req: Request, res: Response, next: NextFunction){
    const product = await fetchPrisma(req.query.name as string);

    const regex = /\(([^)]+)\)/;

    const index = product.indexOf('page.init')

    const entries = product.substring(index, product.length).match(regex)[1];

    const obj = `[${entries}]`;

    const jsonData = JSON.parse(obj)

    res.locals.product = jsonData[0];

    next();
}


export default scrapePrisma;