import { model, Schema } from "mongoose";
const TodoSchema = new Schema({
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
