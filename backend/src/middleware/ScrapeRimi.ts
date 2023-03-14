import { Request, Response, NextFunction } from "express";

function fetchRimi(name: string) {
    const response = fetch(`https://www.rimi.ee/epood/ee/otsing?query=${name}`,{
        method: "GET"
    }).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    });
    return response;
}

async function scrapeRimi(req: Request, res: Response, next: NextFunction){
    const product = await (await fetchRimi(req.query.name as string)).text();
    const searchString = "dataLayer.push"
    const indexes = [];
    let index = product.indexOf(searchString, 0);
    while(index >= 0) {
        indexes.push(index);
        index = product.indexOf(searchString, index + 1);
    };
    const regex = /\(([^)]+)\)/;
    if(indexes.length < 2) {
        return res.send("Product not found").status(204);
    }
    const entries = product.substring(indexes[1], product.length).match(regex)![1];
    const obj = `[${entries}]`;
    
    const jsonData = JSON.parse(obj);
    
    res.locals.product = jsonData[0].ecommerce.impressions[0];
    
    
    next();
}

export default scrapeRimi;