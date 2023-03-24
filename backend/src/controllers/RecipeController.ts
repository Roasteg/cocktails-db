import { Router, Request, Response } from "express";
import { Favourite } from "../models/Favourites";
import Message from "../models/Response";
import { verifyToken, verifyId } from "../service/AuthService";
import Controller from "./Controller";

const recipeRouter = Router();

recipeRouter.get('/favourites/:userId', verifyToken, async (req: Request, res: Response) => {
    const favourites = await Favourite.find({"userId": req.params.userId});
    res.status(200).json(favourites);

})

recipeRouter.post('/favourites/add/:recipeId', verifyToken, verifyId, async (req: Request, res: Response) => {
    const favourite = Favourite.build({
        userId: req.body.userId as string,
        recipeId: parseInt(req.params.recipeId)
    })
    try {
        await favourite.save();
        return res.status(200).json(new Message("Success!", 200));
    }catch (error) {
        return res.status(400).json(new Message("Something went wrong", 400));
    }
})

export class RecipeController extends Controller { 
    public static router: Router = recipeRouter;
}

export default RecipeController;