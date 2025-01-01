import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    toolsUsed: {
      type: String,
    },
    image: {
      type: String,
    },
    githubLink: {
      type: String,
    },
    liveLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
