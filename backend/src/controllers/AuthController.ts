import Controller from "./Controller";
import { Md5 } from "ts-md5";
import { Router, Request, Response, NextFunction } from "express";
import Message from "../models/Response";
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";
import UserResponse from "../models/UserResponse";
require("dotenv").config();

const privateAccessTokenKey = `${process.env.JWT_KEY}`;

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const incorrectString = "Login or password is incorrect";
    const [authorizationType, token] = req.headers.authorization!.split(' ');
    if (authorizationType != 'Basic') {
        res.status(400).json(new Message("Wrong authorization type", 400));
        return;
    }
    const [email, password] = Buffer.from(token, "base64").toString().split(":");

    const user = await User.findOne({"email": email});
    
    if(!user){
        return res.status(401).json(new Message(incorrectString, 401));
    }

    if(Md5.hashStr(password) === user?.password){
        const tokenContent = {
            id: user.id,
            username: user.username,
            issuedAt: new Date()
        };

        const encryptionOptions = {
            expiresIn: '6h'
        }

        const accessToken = jwt.sign(tokenContent, privateAccessTokenKey, encryptionOptions);
        return res.status(200).json({message: "Success!", user: new UserResponse(user.username, accessToken, user.id), status: 200});
    }

    return res.status(401).json(new Message(incorrectString, 401))

});

authRouter.post('/register', async (req: Request, res: Response) => {
    const user = User.build({
        username: req.body.username,
        password: Md5.hashStr(req.body.password)
    });
    try {
        await user.save();
        return res.status(200).json(new Message("Success!", 200));
    } catch(error) {
        return res.status(400).json(new Message("Something went wrong", 400));
    }

})

export class AuthController extends Controller { 
    public static router: Router = authRouter;
}

export default AuthController;