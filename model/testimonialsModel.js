import mongoose from "mongoose";

const testimonialsSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientImage: {
      type: String,
      default: "",
    },
    clientReview: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonals = mongoose.model("Testimonals", testimonialsSchema);

export default Testimonals;
