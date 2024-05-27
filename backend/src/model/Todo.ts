import { model, Schema } from "mongoose";

interface todoInterface {
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  status: string;
  workspaceName: string;
  dueDate: Date;
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
  dueDate: {
    type: Date,
    required: true,
  },
});

export default model("Todo", TodoSchema);
