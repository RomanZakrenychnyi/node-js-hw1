const {listContacts, getContactById, removeContact, addContact} = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
