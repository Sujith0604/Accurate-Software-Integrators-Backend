import fs from "fs";
import WhatWeDo from "../model/WhatWeDoModel.js";

export const getAllWhatwedo = async (req, res) => {
  try {
    const whatwedo = await WhatWeDo.find();
    res.json(whatwedo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWhatwedoById = async (req, res) => {
  try {
    const whatwedo = await WhatWeDo.findById(req.params.id);
    if (!whatwedo)
      return res.status(404).json({ message: "whatwedo not found" });
    res.json(whatwedo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWhatwedo = async (req, res) => {
  const { title, content } = req.body;

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const whatwedo = await WhatWeDo.create({
      title: title,
      content: content,
      image: newPath,
    });
    res.status(201).json(whatwedo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateWhatwedo = async (req, res) => {
  const { title, content } = req.body;
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const oldwhatwedo = await WhatWeDo.findById(req.params.id);
  if (!oldwhatwedo)
    return res.status(404).json({ message: "whatwedo not found" });

  try {
    const updatedwhatwedo = await WhatWeDo.findByIdAndUpdate(
      req.params.id,
      {
        title: title || oldwhatwedo.title,
        content: content || oldwhatwedo.content,
        image: newPath || oldwhatwedo.image,
      },
      { new: true }
    );
    if (!updatedwhatwedo) return res.status(404).json({ message: "whatwedo" });
    res.json(updatedwhatwedo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletewhatwedo = async (req, res) => {
  try {
    const page = await WhatWeDo.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ message: "whatwedo not found" });
    res.json({ message: "whatwedo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
