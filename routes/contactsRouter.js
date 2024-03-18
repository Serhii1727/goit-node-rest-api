import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
<<<<<<< Updated upstream
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
=======
import { shemas } from "../models/contact.js";

const { createContactSchema, updateContactSchema, updateFavoriteSchema } =
  shemas;
>>>>>>> Stashed changes

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

export default contactsRouter;
