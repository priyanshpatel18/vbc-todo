import Todo from "../model/Todo.js";
import User from "../model/User.js";
export const createTodo = async (req, res) => {
    try {
        const { title, description, dueDate, workspaceName } = req.body;
        if (!title || !description || !workspaceName || !dueDate) {
            return res
                .status(400)
                .json({ message: "Title and description are required" });
        }
        const user = req.user;
        const todo = await Todo.create({
            user: user._id,
            title,
            description,
            workspaceName,
            dueDate,
        });
        if (!todo) {
            return res.status(500).json({ message: "Failed to Create Todo" });
        }
        res.status(201).json({ message: "Created successfully", todo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id });
        res.status(200).json(todos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { title, description, status } = req.body;
        console.log(todoId);
        const updateData = {};
        if (title)
            updateData.title = title;
        if (description)
            updateData.description = description;
        if (status)
            updateData.status = status;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, updateData, {
            new: true,
        });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res
            .status(200)
            .json({ message: "Updated successfully", todo: updatedTodo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.body;
        const user = req.user;
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $pull: { todos: { _id: todoId } },
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
