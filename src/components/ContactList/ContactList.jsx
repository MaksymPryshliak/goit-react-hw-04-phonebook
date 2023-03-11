import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({contacts, handleDelete}) => (
    <ul className={css.list}>
        {contacts.map((contact, id)=> (
            <li key={id} className={css.listItem}>
                {contact.name} : {contact.number}
                <button className={css.deleteBtn} onClick={()=> handleDelete(contact.id)} type='buttton'>Delete</button>
            </li>
        ))}
    </ul>
)

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })).isRequired,
    handleDelete: PropTypes.func.isRequired,
}