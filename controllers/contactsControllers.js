import { contactsServices } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await contactsServices.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await contactsServices.getContactById(id);

    if (!contactById) {
      throw HttpError(404);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactDeleteById = await contactsServices.removeContact(id);
    if (!contactDeleteById) {
      throw HttpError(404);
    }

    res.json(contactDeleteById);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactsServices.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = (req, res) => {};
