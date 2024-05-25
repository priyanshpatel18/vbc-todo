import mongoose, { Schema, model } from "mongoose";
const UserSchema = new Schema({
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
