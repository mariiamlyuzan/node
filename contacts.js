const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("db/contacts.json");
const shortid = require("shortid");

async function getContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const data = await getContacts();
    console.table(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();

    const contact = contacts.find((contact) => contact.id === contactId);
    console.table(contact);
    await fs.writeFile("db/contactId.json", JSON.stringify(contact), "utf8");
    console.log("Added new file: contactId.json");
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    console.table(newContacts);
    await fs.writeFile(
      "db/newContactsRemove.json",
      JSON.stringify(newContacts),
      "utf8"
    );
    console.log("Added new file: newContactsRemove.json");
    return newContacts;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts();
    const newContacts = [
      ...contacts,
      { id: shortid.generate(), name, email, phone },
    ];

    if (contacts.find((contact) => contact.name === name)) {
      console.log(`Alredy added ${name}`);
      return;
    }
    await fs.writeFile(
      "db/newContactsAdd.json",
      JSON.stringify(newContacts),
      "utf8"
    );

    console.table(newContacts);
    console.log("Added new file: newContactsAdd.json");
    return newContacts;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
