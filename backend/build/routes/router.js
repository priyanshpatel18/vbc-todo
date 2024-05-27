import express from "express";
import * as todoController from "../controllers/Todo.js";
import * as userController from "../controllers/User.js";
import allowAuthenticated from "../middlewares/authenticateUser.js";
export const todoRouter = express.Router();
todoRouter
    .get("/", allowAuthenticated, todoController.getTodos)
    .post("/", allowAuthenticated, todoController.createTodo)
    .put("/", allowAuthenticated, todoController.updateTodo)
    .delete("/", allowAuthenticated, todoController.deleteTodo);
export const userRouter = express.Router();
userRouter
    .get("/", userController.getUser)
    .post("/login", userController.loginUser)
    .post("/register", userController.registerUser)
    .post("/logout", userController.logoutUser)
    .delete("/", allowAuthenticated, userController.deleteUser)
    .patch("/:todoId", allowAuthenticated, userController.updateUser);
