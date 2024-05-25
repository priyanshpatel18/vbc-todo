import { model, Schema } from "mongoose";

interface todoInterface {
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  status: string;
  workspaceName: string;
  createdAt: Date;
}

const TodoSchema = new Schema<todoInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "completed"],
      message: "Invalid status",
    },
    default: "pending",
  },
  workspaceName: {
    type: String,
    enum: {
      values: ["personal", "work", "education"],
      message: "Invalid status",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Todo", TodoSchema);
