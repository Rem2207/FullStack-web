import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  customized_plushies: [
    {
      plushies: {
        type: Object,
      },
      accessories: {
        type: Object,
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
