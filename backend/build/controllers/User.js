import { compare, genSalt, hash } from "bcrypt";
import { generateJWT, verifyJWT } from "../lib/auth.js";
import Todo from "../model/Todo.js";
import User from "../model/User.js";
export const getUser = async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            return res.status(200).json(null);
        }
        const decoded = verifyJWT(token);
        if (!decoded || typeof decoded !== "object") {
            return res.status(200).json(null);
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(200).json(null);
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "User Not Found" });
    }
};
export const registerUser = async (req, res) => {
    const { displayName, email, password } = req.body;
    console.log(req.body);
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
        res.status(201).json({ message: "Registered successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const loginUser = async (req, res) => {
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
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "Login successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfully" });
};
export const updateUser = async (req, res) => {
    const { email, displayName } = req.body;
    const user = req.user;
    try {
        const userExists = await User.findOne({ email });
        if (userExists && userExists._id.toString() !== user._id.toString()) {
            return res.status(409).json({ message: "Email should be unique" });
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            displayName,
            email,
        });
        if (!updatedUser) {
            return res.status(500).json({ message: "User not updated" });
        }
        res.status(200).json({ message: "Updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = req.user;
        const todos = await Todo.deleteMany({ user: user._id });
        if (!todos) {
            return res.status(500).json({ message: "Internal server error" });
        }
        await User.findByIdAndDelete(user._id);
        res.clearCookie("token");
        res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
