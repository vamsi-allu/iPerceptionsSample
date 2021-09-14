import ContactDetails from '../../screens/ContactDetails';
import Contact from '../../models/contact';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const mockDispatchFn = jest.fn();

const mockEffect = jest.fn();

const mockSelectorState = jest.fn();

const mockDispatchState = jest.fn().mockReturnValue(mockDispatchFn);

let props = {
  navigation: {
    navigate: jest.fn(),
    state: {
      params: {
        itemId: '1',
      },
    },
  },
};

describe('contact details', () => {
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
          contacts: [
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

    mockEffect.mockImplementation((callback) => {
      callback();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('can render', (done) => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    const component = shallow(<ContactDetails {...props} />);

    expect(component).toBeTruthy();
    setTimeout(() => {
      expect(mockSelectorState).toBeCalled();
      done();
    }, 5000);
    expect(mockDispatchState).toBeCalled();
  });

  it('can test press events', async () => {
    const stateSetter = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((stateValue) => [
      (stateValue = {
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
          contacts: [
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
      stateSetter,
    ]);

    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);

    const component = shallow(<ContactDetails {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockDispatchState).toBeCalled();
  });
});
