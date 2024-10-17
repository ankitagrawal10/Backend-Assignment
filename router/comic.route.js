import express from "express";
import {
  createComic,
  deleteComic,
  fetchComicBook,
  getComicDetails,
  updateComic,
} from "../controller/comic.controller.js";

const router = express.Router();
router.post("/createComic", createComic);
router.put("/editComic/:id", updateComic);
router.delete("/deleteComic/:id", deleteComic);
router.get("/getComics/:id", getComicDetails);
router.get("/fetchBook",fetchComicBook)

export default router;
