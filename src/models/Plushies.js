import mongoose from "mongoose";
import { randomUUID } from "crypto";

const PlushiesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  colors: [{
    name: {
      type: String,
      required: true,
    },
    image: [{
      type: String,
      required: true,
    }]
  }],
  description: {
    type: String,
    required: true,
  },
  count:{
    type: Number,
    default: 0
  }
});

export default mongoose.model("Plushies", PlushiesSchema);
