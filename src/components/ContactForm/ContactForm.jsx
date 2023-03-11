import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ submitForm }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value)
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const  onSubmitFrom = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    submitForm({name, number});
    form.reset();
    setName('');
    setNumber('')

  };

  return (
    <form className={css.contactForm} onSubmit={onSubmitFrom}>
      <label className={css.formLabel}>Name</label>
      <input
        className={css.contactInput}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        placeholder="Enter name"
        value={name}
        onChange={handleChange}
      />
      <label className={css.formLabel}>Number</label>
      <input
        className={css.contactInput}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Enter number"
        value={number}
        onChange={handleChange}
      />
      <button type="submit" className={css.formButton}>
        Add contact
      </button>
    </form>
  );
};


ContactForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
}
