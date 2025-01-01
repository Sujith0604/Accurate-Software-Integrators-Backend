import express from "express";

import multer from "multer";
import {
  createdeveloper,
  deletedeveloper,
  getAlldeveloper,
  getdeveloperById,
  updatedeveloper,
} from "../controller/developerController.js";

const uploadMiddleWare = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAlldeveloper)
  .post(uploadMiddleWare.single("image"), createdeveloper);

router
  .route("/:id")
  .get(getdeveloperById)
  .put(uploadMiddleWare.single("image"), updatedeveloper)
  .delete(deletedeveloper);

export default router;
