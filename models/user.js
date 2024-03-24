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
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
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

export const schemas = {
  createSignupUserSchema,
  createSigninUserSchema,
};
