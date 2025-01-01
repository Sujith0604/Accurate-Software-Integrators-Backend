import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controller/projectController.js";
import multer from "multer";

const uploadMiddleWare = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(uploadMiddleWare.single("image"), createProject);

router
  .route("/:id")
  .get(getProjectById)
  .put(uploadMiddleWare.single("image"), updateProject)
  .delete(deleteProject);

export default router;
