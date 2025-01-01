import express from "express";
import multer from "multer";
import {
  createWhatwedo,
  deletewhatwedo,
  getAllWhatwedo,
  getWhatwedoById,
  updateWhatwedo,
} from "../controller/whatWeDoController.js";

const uploadMiddleWare = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllWhatwedo)
  .post(uploadMiddleWare.single("image"), createWhatwedo);

router
  .route("/:id")
  .get(getWhatwedoById)
  .put(uploadMiddleWare.single("image"), updateWhatwedo)
  .delete(deletewhatwedo);

export default router;
