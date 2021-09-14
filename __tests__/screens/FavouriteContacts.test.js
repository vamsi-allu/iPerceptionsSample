import FavouriteContacts from '../../screens/FavouriteContacts';
import Contact from '../../models/contact';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const mockSelectorState = jest.fn();

let props = {};

describe('favourite contacts', () => {
  beforeEach(() => {
    mockSelectorState.mockImplementation((callback) =>
      callback({
        contactsList: {
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
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('can render', (done) => {
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    const component = shallow(<FavouriteContacts {...props} />);

    expect(component).toBeTruthy();
    setTimeout(() => {
      expect(mockSelectorState).toBeCalled(); // or whatever
      done();
    }, 5000);
  });
});
