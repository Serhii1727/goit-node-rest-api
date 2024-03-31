import express from "express";
import authController from "../controllers/authController.js";
import { schemas } from "../models/user.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

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

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authController.updateAvatar
);

export default authRouter;
