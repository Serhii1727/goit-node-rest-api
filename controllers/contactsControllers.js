import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Contact } from "../models/contact.js";
import fs from "fs/promises";
import path from "path";

const avatarPath = path.resolve("public", "avatars");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * 20;
  const allContacts = await Contact.find({ owner }, null, {
    skip,
    limit,
  });

  res.json(allContacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);

  if (!contactById) {
    throw HttpError(404);
  }
  res.json(contactById);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contactDeleteById = await Contact.findByIdAndDelete(id);
  if (!contactDeleteById) {
    throw HttpError(404);
  }

  res.json(contactDeleteById);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;

  console.log(req.body);
  console.log(req.file);

  const { path: oldPath, filename } = req.file;
  console.log(filename);

  const newPath = path.join(avatarPath, filename);

  await fs.rename(oldPath, newPath);

  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateContact) {
    throw HttpError(404);
  }
  res.json(updateContact);
};

const updateContactFavorite = async (req, res) => {
  const { id } = req.params;

  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateContact) {
    throw HttpError(404);
  }

  res.json(updateContact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateContactFavorite: ctrlWrapper(updateContactFavorite),
};
