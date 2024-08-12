import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectContacts, selectNameFilter } from "../../redux/selectorsSlice";

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const inputValue = useSelector(selectNameFilter);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const filteredContactsCheck =
    filteredContacts.length > 0 ? filteredContacts : contacts;

  return (
    <ul className={css.contact_list}>
      {filteredContactsCheck.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
