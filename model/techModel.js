import mongoose from "mongoose";

const techSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Tech = mongoose.model("Tech", techSchema);

export default Tech;
