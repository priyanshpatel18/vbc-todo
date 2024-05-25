import { compare, genSalt, hash } from "bcrypt";
import { generateJWT } from "../lib/auth.js";
import Todo from "../model/Todo.js";
import User from "../model/User.js";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Not Found" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { displayName, email, password } = req.body;

  if (!displayName || !email || !password) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      displayName,
      email,
      password: await hash(password, await genSalt(10)),
    });

    if (!user) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = generateJWT({ id: user._id });
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await compare(password, userExists.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = generateJWT({ id: userExists._id });
    res.cookie("token", token, {
      // httpOnly: true,
      // sameSite: "none",
      // secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully" });
};

export const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, { name });
    if (!updatedUser) {
      return res.status(500).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const todos = await Todo.deleteMany({ user: user._id });
    if (!todos) {
      return res.status(500).json({ message: "Internal server error" });
    }

    await User.findByIdAndDelete(user._id);
    res.clearCookie("token");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
