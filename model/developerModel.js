import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    website: {
      type: String,
    },
    instagram: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Developer = mongoose.model("Developer", developerSchema);

export default Developer;
