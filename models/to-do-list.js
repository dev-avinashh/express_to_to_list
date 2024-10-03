import mongoose from "mongoose";

const toDoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const toDoModel = mongoose.model("toDo", toDoListSchema);
