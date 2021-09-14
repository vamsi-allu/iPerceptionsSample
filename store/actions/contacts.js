export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

export const toggleFavorite = (id) => {
  return {type: TOGGLE_FAVORITE, contactId: id};
};

export const addContact = (
  firstName,
  lastName,
  mailId,
  phoneNumber,
  imageUri,
) => {
  return {
    type: ADD_CONTACT,
    contactInfo: {
      firstName,
      lastName,
      mailId,
      phoneNumber,
      imageUri,
    },
  };
};

export const updateContact = (
  id,
  firstName,
  lastName,
  mailId,
  phoneNumber,
  imageUri,
) => {
  return {
    type: UPDATE_CONTACT,
    contactInfo: {
      id,
      firstName,
      lastName,
      mailId,
      phoneNumber,
      imageUri,
    },
  };
};

export const deleteContact = (id) => {
  return {
    type: DELETE_CONTACT,
    contactId: id,
  };
};
