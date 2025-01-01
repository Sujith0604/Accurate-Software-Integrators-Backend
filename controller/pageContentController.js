import Page from "../model/pageModel.js";
import fs from "fs";

export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPage = async (req, res) => {
  const {
    title,
    content,
    facebook,
    twitter,
    linkedin,
    github,
    website,
    instagram,
    subTitle,
    buttonName,
  } = req.body;

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const pagecontent = await Page.create({
      title: title,
      subTitle: subTitle,
      content: content,
      facebook: facebook,
      twitter: twitter,
      linkedin: linkedin,
      github: github,
      website: website,
      instagram: instagram,
      buttonName: buttonName,
      image: newPath,
    });
    res.status(201).json(pagecontent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePage = async (req, res) => {
  const {
    title,
    content,
    facebook,
    twitter,
    linkedin,
    github,
    website,
    instagram,
    subTitle,
    buttonName,
  } = req.body;
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const oldPage = await Page.findById(req.params.id);
  if (!oldPage) return res.status(404).json({ message: "Page not found" });

  try {
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      {
        title: title || oldPage.title,
        subTitle: subTitle || oldPage.subTitle,
        content: content || oldPage.content,
        facebook: facebook || oldPage.facebook,
        twitter: twitter || oldPage.twitter,
        linkedin: linkedin || oldPage.linkedin,
        github: github || oldPage.github,
        website: website || oldPage.website,
        instagram: instagram || oldPage.instagram,
        buttonName: buttonName || oldPage.buttonName,
        image: newPath || oldPage.image,
      },
      { new: true }
    );
    if (!updatedPage)
      return res.status(404).json({ message: "Page not found" });
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json({ message: "Page deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
