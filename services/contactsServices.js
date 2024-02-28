import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(index, 1);
  await updateContacts(contacts);

  return removeContact;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

export async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  const oldContact = contacts.find((contact) => contact.id === id);
  console.log(oldContact);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...oldContact, ...data };

  await updateContacts(contacts);
  return contacts[index];
}

export const contactsServices = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
