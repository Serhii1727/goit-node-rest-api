import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Contact } from "../models/contact.js";

const getAllContacts = async (_, res) => {
  const allContacts = await Contact.find();
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
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone });
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
