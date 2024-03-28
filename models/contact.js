import { Schema, model } from "mongoose";
import Joi from "joi";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Contact = model("contact", contactSchema);

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const shemas = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};
