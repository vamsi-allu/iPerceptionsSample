import {CONTACTS} from '../../data/SampleData';
import {
  TOGGLE_FAVORITE,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from '../actions/contacts';
import Contact from '../../models/contact';

const initialState = {
  contacts: CONTACTS,
  favoriteContacts: [],
};

const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const favIndex = state.favoriteContacts.findIndex(
        (contact) => contact.id === action.contactId,
      );
      if (favIndex >= 0) {
        const updatedFavContacts = [...state.favoriteContacts];
        updatedFavContacts.splice(favIndex, 1);
        return {...state, favoriteContacts: updatedFavContacts};
      } else {
        const contact = state.contacts.find(
          (localContact) => localContact.id === action.contactId,
        );
        return {
          ...state,
          favoriteContacts: state.favoriteContacts.concat(contact),
        };
      }
    case ADD_CONTACT:
      const tempState = state;
      tempState.contacts.sort((a, b) => {
        return a.id - b.id;
      });
      let maxId = tempState.contacts[tempState.contacts.length - 1].id;
      const newContact = new Contact(
        parseInt(maxId, 10) + 1 + '',
        action.contactInfo.firstName,
        action.contactInfo.lastName,
        action.contactInfo.phoneNumber,
        action.contactInfo.mailId,
        action.contactInfo.imageUri,
      );
      return {
        ...state,
        contacts: state.contacts.concat(newContact),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.contactId,
        ),
        favoriteContacts: state.favoriteContacts.filter(
          (contact) => contact.id !== action.contactId,
        ),
      };
    case UPDATE_CONTACT:
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.contactInfo.id,
      );
      const updateContact = new Contact(
        action.contactInfo.id,
        action.contactInfo.firstName,
        action.contactInfo.lastName,
        action.contactInfo.phoneNumber,
        action.contactInfo.mailId,
        action.contactInfo.imageUri,
      );
      const updatedContacts = [...state.contacts];
      updatedContacts[index] = updateContact;
      return {
        ...state,
        contacts: updatedContacts,
      };
    default:
      return state;
  }
};

export default ContactReducer;
