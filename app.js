import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import connectiondb from "./db/connectiondb.js";
import rootRoute from './routes/rootRoute.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";


//detabase conneciton
connectiondb(DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



rootRoute(app);

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})