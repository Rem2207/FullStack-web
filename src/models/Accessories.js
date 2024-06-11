import mongoose from "mongoose";

const AccessoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Accessories", AccessoriesSchema);
