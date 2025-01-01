import express from "express";
import {
  createTestimonals,
  deleteTestimonals,
  getAllTestimonals,
  getTestimonalsById,
  updateTestimonals,
} from "../controller/testimonuController.js";
import multer from "multer";

const uploadMiddleWare = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllTestimonals)
  .post(uploadMiddleWare.single("clientImage"), createTestimonals);

router
  .route("/:id")
  .get(getTestimonalsById)
  .put(uploadMiddleWare.single("clientImage"), updateTestimonals)
  .delete(deleteTestimonals);

export default router;
