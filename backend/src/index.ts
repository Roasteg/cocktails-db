import express from "express";
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.DATABASE_HOST;


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

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(methodOverride());
app.use(router);

app.get('/', (req, res) =>{
    res.json({message: "Hello world"});
})

app.listen(port, ()=> {
    console.log(`Listening on http://localhost:${port}`);
})