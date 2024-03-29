import express from "express";
import morgan from "morgan";
import cors from "cors";

import AuthController from "./controllers/AuthController";
import ProductSuggestion from "./controllers/ProductSuggestion";
import RecipeController from "./controllers/RecipeController";

const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
 
const mongoUrl = process.env.DATABASE_HOST;
 
const logger = morgan('common');

mongoose.connect(mongoUrl); 

const database = mongoose.connection;

database.on("error", () => {
    console.log("Error");
})

database.once("connected", ()=>{
    console.log("Connected to mongo!");
})

const app = express();
const router = express.Router();

const port = process.env.PORT || 8000;

app.use(cors({
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
}))

app.use(logger);
app.use(express.json());
app.use(methodOverride());
app.use(router);

router.use('/auth', AuthController.router);
router.use('/product', ProductSuggestion.router);
router.use('/recipe', RecipeController.router);

router.get('/', (req, res) =>{
    res.json({message: "Hello world"});
})

app.listen(port, ()=> {
    console.log(`Listening on http://localhost:${port}`);
}) 