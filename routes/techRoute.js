import express from "express";
import multer from "multer";
import {
  createTech,
  deleteTech,
  getAllTech,
  getTechById,
  updateTech,
} from "../controller/techController.js";

const uploadMiddleWare = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllTech)
  .post(uploadMiddleWare.single("image"), createTech);

router
  .route("/:id")
  .get(getTechById)
  .put(uploadMiddleWare.single("image"), updateTech)
  .delete(deleteTech);

export default router;
