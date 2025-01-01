import fs from "fs";
import Tech from "../model/techModel.js";

export const getAllTech = async (req, res) => {
  try {
    const techs = await Tech.find();
    res.json(techs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTechById = async (req, res) => {
  try {
    const tech = await Tech.findById(req.params.id);
    res.json(tech);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTech = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title } = req.body;

  try {
    const tech = await Tech.create({
      title,
      image: newPath,
    });
    res.status(201).json(tech);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTech = async (req, res) => {
  const { title } = req.body;
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
    const oldTech = await Tech.findById(id);
    if (!oldTech) return res.status(404).json({ message: "Tech not found" });

    const updatedTech = await Tech.findByIdAndUpdate(
      id,
      {
        title: title || oldTech.title,
        image: newPath || oldTech.image,
      },
      { new: true }
    );
    if (!updatedTech)
      return res.status(404).json({ message: "Tech not found" });
    res.json(updatedTech);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTech = async (req, res) => {
  try {
    const deletedTech = await Tech.findByIdAndDelete(req.params.id);
    if (!deletedTech)
      return res.status(404).json({ message: "Tech not found" });
    res.json({
      message: "Tech deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
