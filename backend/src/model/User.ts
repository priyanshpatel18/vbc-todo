import mongoose, { Schema, model } from "mongoose";

export interface UserInterface {
  displayName: string;
  email: string;
  password: string;
  createdAt: Date;
  todos: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<UserInterface>({
  displayName: {
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  todos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Todo",
    default: [],
  },
});

export default model("User", UserSchema);
