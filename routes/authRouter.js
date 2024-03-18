import express from "express";
import authController from "../controllers/authController.js";
import { schemas } from "../models/user.js";
import validateBody from "../helpers/validateBody.js";

const { createSignupUserSchema, createSigninUserSchema } = schemas;

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(createSignupUserSchema),
  authController.register
);

authRouter.post(
  "/login",
  validateBody(createSigninUserSchema),
  authController.login
);

export default authRouter;
