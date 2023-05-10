const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contacts = data.find((contact) => contact.id === contactId);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newContacts = data.filter((contact) => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts, 0, 2));
    console.log(`contact removed`);
    return newContacts;
  } catch (error) {
    console.log("can't remove contact");
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await listContacts();
    const newContacts = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    data.push(newContacts);

    await fs.writeFile(contactsPath, JSON.stringify(data, 0, 2));
    return newContacts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
