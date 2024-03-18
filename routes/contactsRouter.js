import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { isValidId } from "../helpers/isValidId.js";

import validateBody from "../helpers/validateBody.js";
import { shemas } from "../models/contact.js";

const { createContactSchema, updateContactSchema, updateFavoriteSchema } =
  shemas;

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsControllers.updateContactFavorite
);

export default contactsRouter;
