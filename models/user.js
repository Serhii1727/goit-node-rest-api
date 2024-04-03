import { Schema, model } from "mongoose";
import Joi from "joi";

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  avatarURL: {
    type: String,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

export const User = model("user", userSchema);

const createSignupUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const createSigninUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const createUserEmailSchema = Joi.object({
  email: Joi.string().required(),
});

export const schemas = {
  createSignupUserSchema,
  createSigninUserSchema,
  createUserEmailSchema,
};
