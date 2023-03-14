import axios from "axios";

import { Request, Response, NextFunction } from "express";

function fetchPrisma(name: string) {
    const response = axios.get(`https://www.prismamarket.ee/products/search/${name}`).then((data) => {
        return data.data;
    }).catch((error) => {
        return error;
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

    if(jsonData[0].num_results === 0) {
        return res.send("Product not found").status(204);
    }

    res.locals.product = jsonData[0].categories[0].entries[0];

    next();
}


export default scrapePrisma;