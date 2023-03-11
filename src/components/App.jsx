import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const localStorageSavedContacts = localStorage.getItem('contactList');
    const parsedContacts = JSON.parse(localStorageSavedContacts);

    if(parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevState) {
    const prevStateContacts = prevState.contacts;
    const nexStateContacts = this.state.contacts;

    if (prevStateContacts !== nexStateContacts) {
      localStorage.setItem('contactList', JSON.stringify(nexStateContacts))
    }

  }

  handleSubmit = evt => {
    const id = nanoid();
    const name = evt.name;
    const number = evt.number;
    const contactList = [...this.state.contacts];

    if (contactList.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactList.push({ id, name, number });
    }
    this.setState({ contacts: contactList });
  };

  filteredContacts = () => {
    const filteredContactList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
    return filteredContactList;
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleDelete = evt => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== evt),
    }));
  };

  render() {
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
        <ContactForm submitForm={this.handleSubmit} />
        <h2
          style={{
            fontSize: 'x-large',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          Contacts
        </h2>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <ContactList
          contacts={this.filteredContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
