import Testimonals from "../model/testimonialsModel.js";
import fs from "fs";

export const getAllTestimonals = async (req, res) => {
  try {
    const projects = await Testimonals.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTestimonalsById = async (req, res) => {
  try {
    const project = await Testimonals.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Testimonals not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTestimonals = async (req, res) => {
  const { clientName, clientReview, ratings } = req.body;

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const testimonals = await Testimonals.create({
      clientName,
      clientImage: newPath,
      clientReview,
      ratings,
    });
    res.json(testimonals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTestimonals = async (req, res) => {
  const { clientName, clientReview, ratings } = req.body;
  const { id } = req.params;

  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  try {
    const oldTestimony = await Testimonals.findById(id);
    if (!oldTestimony)
      return res.status(404).json({ message: "Testimony not found" });

    const testimonals = await Testimonals.findByIdAndUpdate(
      id,
      {
        clientName: clientName || oldTestimony.clientName,
        clientImage: newPath || oldTestimony.clientImage,
        clientReview: clientReview || oldTestimony.clientReview,
        ratings: ratings || oldTestimony.ratings,
      },
      { new: true }
    );
    if (!testimonals)
      return res.status(404).json({ message: "Testimonals not found" });
    res.json(testimonals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTestimonals = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonals = await Testimonals.findByIdAndDelete(id);
    if (!testimonals)
      return res.status(404).json({ message: "Testimonals not found" });
    res.json({ message: "Testimonals deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
