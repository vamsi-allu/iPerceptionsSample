import {
  deleteContact,
  updateContact,
  toggleFavorite,
  addContact,
} from '../../../store/actions/contacts';
import ContactReducer from '../../../store/reducers/contacts';
import Contact from '../../../models/contact';
import {CONTACTS} from '../../../data/SampleData';

describe('Contacts Reducer', () => {
  it('Should return default state', () => {
    const newState = ContactReducer(undefined, {});
    expect(newState).toBeDefined();
  });

  it('Should return new state if receiving type is toggle Favorite', () => {
    const posts = [{title: 'Test 1'}, {title: 'Test 2'}, {title: 'Test 3'}];
    const expected = [undefined];
    const newState = ContactReducer(undefined, {
      type: toggleFavorite('2').type,
      payload: posts,
    });
    expect(newState.favoriteContacts).toEqual(expected);
  });

  it('Should return new state if receiving type is toggle Favorite with existing state', () => {
    const posts = [{title: 'Test 1'}, {title: 'Test 2'}, {title: 'Test 3'}];
    const newState = ContactReducer(
      {
        favoriteContacts: [
          new Contact(
            '1',
            'Ab',
            'Devillers',
            '1234567890',
            'Ab.Devillers@optum.com',
            'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
          ),
        ],
        contacts: CONTACTS,
      },
      {
        type: toggleFavorite('2').type,
        payload: posts,
      },
    );
    expect(newState.favoriteContacts).toBeDefined();
  });

  it('Should return new state if receiving type is Add contact', () => {
    const posts = {
      firstName: 'testName',
      lastName: 'testNamel',
      phoneNumber: '123456789',
      mailId: 'abc@test.com',
    };
    const newState = ContactReducer(undefined, {
      type: addContact('testName', 'testNamel', '123456789', 'abc@test.com')
        .type,
      contactInfo: posts,
    });
    expect(newState.contacts.length).toEqual(27);
  });

  it('Should return new state if receiving type is delete contact with existing data', () => {
    const newState = ContactReducer(
      {
        favoriteContacts: [
          new Contact(
            '1',
            'Ab',
            'Devillers',
            '1234567890',
            'Ab.Devillers@optum.com',
            'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
          ),
        ],
        contacts: CONTACTS,
      },
      {
        type: deleteContact('2').type,
        contactId: '2',
      },
    );
    expect(newState.contacts.length).toEqual(25);
  });

  it('Should return new state if receiving type is delete contact', () => {
    const newState = ContactReducer(undefined, {
      type: deleteContact('2').type,
      contactId: '2',
    });
    expect(newState.contacts.length).toEqual(25);
  });

  it('Should return new state if receiving type is Update contact', () => {
    const posts = {
      id: '1',
      firstName: 'testName',
      lastName: 'testNamel',
      phoneNumber: '123456789',
      mailId: 'abc@test.com',
      imageUri: '',
    };
    const newState = ContactReducer(undefined, {
      type: updateContact(
        '1',
        'testName',
        'testNamel',
        '123456789',
        'abc@test.com',
        '',
      ).type,
      contactInfo: posts,
    });
    expect(newState.contacts[0]).toEqual(posts);
  });
});
