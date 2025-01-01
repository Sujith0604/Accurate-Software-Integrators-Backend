import Project from "../model/projectModel.js";
import fs from "fs";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, description, toolsUsed, githubLink, liveLink } = req.body;

  try {
    const project = await Project.create({
      title,
      description,
      toolsUsed,
      image: newPath,
      githubLink,
      liveLink,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { title, description, toolsUsed, githubLink, liveLink } = req.body;
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
    const oldProject = await Project.findById(req.params.id);
    if (!oldProject)
      return res.status(404).json({ message: "Project not found" });

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: title || oldProject.title,
        description: description || oldProject.description,
        toolsUsed: toolsUsed || oldProject.toolsUsed,
        image: newPath || oldProject.image,
        githubLink: githubLink || oldProject.github,
        liveLink: liveLink || oldProject.live,
      },
      { new: true }
    );
    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
