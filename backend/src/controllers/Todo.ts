import Todo from "../model/Todo.js";
import User from "../model/User.js";
import { Request, Response } from "express";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, workspaceName } = req.body;
    if (!title || !description || !workspaceName) {
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
    });
    if (!todo) {
      return res.status(500).json({ message: "Failed to create todo" });
    }

    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, status, todoId } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
      title,
      description,
      status,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
