import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useEffect, useState } from 'react';
import { ContactForm, ContactList, Filter, Section } from '../components';
import { AppStyled, Main } from './App.styled';

const SAVED_CONTACTS = 'contacts';
export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  ]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const data = localStorage.getItem(SAVED_CONTACTS);

    if (data) {
      setContacts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);
  const createNewContact = data => {
    const normalizeFilter = data.name.toLowerCase();
    const stateNameArray = contacts.map(({ name }) => name.toLowerCase());

    !stateNameArray.includes(normalizeFilter)
      ? setContacts([...contacts, data])
      : Notify.failure(`${data.name} is already in contacts.`, {
          width: '350px',
          opacity: 0.8,
        });
  };

  const deleteContact = (contactId, name) => {
    setContacts(prevStates =>
      prevStates.filter(contact => contact.id !== contactId)
    );
    Notify.success(`${name}  delete from your contacts`, {
      width: '350px',
      opacity: 0.8,
    });
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const findContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <AppStyled>
      <Main>
        <Section title="Phonebook">
          <ContactForm createNewContact={createNewContact} />
        </Section>

        <Section title="Contacts">
          <Filter filterValue={filter} onChange={onFilterChange} />
          <ContactList contacts={findContact()} deleteContact={deleteContact} />
        </Section>
      </Main>
    </AppStyled>
  );
};
