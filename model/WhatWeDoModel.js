import mongoose from "mongoose";

const whatWeDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
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

const WhatWeDo = mongoose.model("WhatWeDo", whatWeDoSchema);

export default WhatWeDo;
