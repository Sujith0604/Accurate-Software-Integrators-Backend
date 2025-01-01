import express from "express";
import {
  createPage,
  deletePage,
  getAllPages,
  getPageById,
  updatePage,
} from "../controller/pageContentController.js";
import multer from "multer";

const uploadMiddleWare = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllPages)
  .post(uploadMiddleWare.single("image"), createPage);

router
  .route("/:id")
  .get(getPageById)
  .put(uploadMiddleWare.single("image"), updatePage)
  .delete(deletePage);

export default router;
