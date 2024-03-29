import { Router, Request, Response, } from "express";
import Controller from "./Controller";
import scrapeAraxes from "../middleware/ScrapeAraxes";
import scrapePrisma from "../middleware/ScrapePrisma";
import Grocery from "../models/Grocery";
import scrapeRimi from "../middleware/ScrapeRimi";

const productRouter = Router();
const prismaLink = "https://www.prismamarket.ee/entry/";
const rimiLink = "https://www.rimi.ee/epood/ee/tooted/p/"

productRouter.get("/araxes", scrapeAraxes, (req: Request, res: Response) => {
    return res.send(new Grocery(res.locals.product.value, res.locals.product.price, res.locals.product.permalink)).status(200);
})

productRouter.get("/prisma", scrapePrisma, (req: Request, res: Response) => {
    return res.send(new Grocery(res.locals.product.name, res.locals.product.price, prismaLink + res.locals.product.ean)).status(200);
})

productRouter.get("/rimi", scrapeRimi, (req: Request, res: Response) => {
    return res.send(new Grocery(res.locals.product.name, res.locals.product.price, rimiLink + res.locals.product.id)).status(200);
})

export class ProductSuggestion extends Controller {
    public static router = productRouter;
}

export default ProductSuggestion;