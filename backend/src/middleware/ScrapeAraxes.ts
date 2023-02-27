import axios from "axios";
import { NextFunction, Request, Response } from "express";

function fetchAraxes(product: string){
    const response = axios.get(`https://araxes.ee/wp-admin/admin-ajax.php?action=woodmart_ajax_search&number=20&post_type=product&query=${product}`).then((data)=>{
        return data.data.suggestions[0];
    });
    return response;
}

async function scrapeAraxes(req: Request, res: Response, next: NextFunction) {
    const product = await fetchAraxes(req.query.name as string);
    if(product.no_found){
        return res.send("Product not found").status(204);
    }

    product.price = product.price.match(/\d+/g).join('.');
    res.locals.product = product;
    next();
} 


export default scrapeAraxes;