import { contactsServices } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (_, res) => {
  const allContacts = await contactsServices.listContacts();
  res.json(allContacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contactById = await contactsServices.getContactById(id);

  if (!contactById) {
    throw HttpError(404);
  }
  res.json(contactById);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contactDeleteById = await contactsServices.removeContact(id);
  if (!contactDeleteById) {
    throw HttpError(404);
  }

  res.json(contactDeleteById);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await contactsServices.addContact(name, email, phone);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const updateContact = await contactsServices.updateContact(id, req.body);

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
};
