import fs from "fs";
import Developer from "../model/developerModel.js";

export const getAlldeveloper = async (req, res) => {
  try {
    const developer = await Developer.find();
    res.json(developer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getdeveloperById = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer)
      return res.status(404).json({ message: "developer  not found" });
    res.json(developer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createdeveloper = async (req, res) => {
  const {
    title,
    content,
    username,
    facebook,
    twitter,
    linkedin,
    github,
    website,
    instagram,
  } = req.body;

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const developer = await Developer.create({
      title: title,
      username: username,
      content: content,
      facebook: facebook,
      twitter: twitter,
      linkedin: linkedin,
      github: github,
      website: website,
      instagram: instagram,
      image: newPath,
    });
    res.status(201).json(developer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatedeveloper = async (req, res) => {
  const {
    title,
    content,
    username,
    facebook,
    twitter,
    linkedin,
    github,
    website,
    instagram,
  } = req.body;
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const olddeveloper = await Developer.findById(req.params.id);
  if (!olddeveloper)
    return res.status(404).json({ message: "developer  not found" });

  try {
    const updateddeveloper = await Developer.findByIdAndUpdate(
      req.params.id,
      {
        title: title || olddeveloper.title,
        username: username || olddeveloper.username,
        content: content || olddeveloper.content,
        facebook: facebook || olddeveloper.facebook,
        twitter: twitter || olddeveloper.twitter,
        linkedin: linkedin || olddeveloper.linkedin,
        github: github || olddeveloper.github,
        website: website || olddeveloper.website,
        instagram: instagram || olddeveloper.instagram,
        image: newPath || olddeveloper.image,
      },
      { new: true }
    );
    if (!updateddeveloper)
      return res.status(404).json({ message: "Not updated developer" });
    res.json(updateddeveloper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletedeveloper = async (req, res) => {
  try {
    const developer = await Developer.findByIdAndDelete(req.params.id);
    if (!developer)
      return res.status(404).json({ message: "developer not found" });
    res.json({ message: "developer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
