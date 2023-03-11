import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ] ?? JSON.parse(window.localStorage.getItem('contactList')));


  useEffect(() => {
    window.localStorage.setItem('contactList', JSON.stringify(contacts))
  }, [contacts])

  const handleSubmit = date => {
    const id = nanoid();
    const name = date.name;
    const number = date.number;
    const contactList = [...contacts];

    if (contactList.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactList.push({ id, name, number });
    }
    setContacts(contactList);
  };

  const filteredContacts = () => {
    const filteredContactList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContactList;
  };

  const handleChange = evt => {
    const { value } = evt.target;
    setFilter( value );
  };

  const handleDelete = evt => {
    setContacts(contacts.filter(contact => contact.id !== evt));
  };

  return (
    <div>
      <h1
        style={{
          fontSize: 'xx-large',
          textAlign: 'center',
          marginTop: '30px',
        }}
      >
        Phonebook
      </h1>
      <ContactForm submitForm={handleSubmit} />
      <h2
        style={{
          fontSize: 'x-large',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        Contacts
      </h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={filteredContacts()}
        handleDelete={handleDelete}
      />
    </div>
  );
};
