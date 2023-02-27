import { Router, Request, Response, } from "express";
import Controller from "./Controller";
import scrapeAraxes from "../middleware/ScrapeAraxes";
import scrapePrisma from "../middleware/ScrapePrisma";
import Grocery from "../models/Grocery";

const productRouter = Router();

productRouter.get('/araxes', scrapeAraxes, (req: Request, res: Response) => {
    return res.send(new Grocery(res.locals.product.value, res.locals.product.price, res.locals.product.permalink));
})

productRouter.get('/prisma', scrapePrisma, (req: Request, res: Response) => {
    return res.send(res.locals.obj);
})

export class ProductSuggestion extends Controller {
    public static router = productRouter;
}

export default ProductSuggestion;