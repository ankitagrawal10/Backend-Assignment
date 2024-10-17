import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import comicRouter from "./router/comic.route.js"

dotenv.config();

const app = express();

app.use(express.json());


// mongodb connection
connectDB();

app.use('/api/comics',comicRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
