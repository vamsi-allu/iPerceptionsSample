import ContactsList from '../../screens/ContactsList';
import Contact from '../../models/contact';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {TouchableOpacity} from 'react-native-gesture-handler';

Enzyme.configure({adapter: new Adapter()});

const mockEffect = jest.fn();

const mockSelectorState = jest.fn();

const mockDispatchState = jest
  .fn()
  .mockReturnValue([
    new Contact(
      '1',
      'Ab',
      'Devillers',
      '1234567890',
      'Ab.Devillers@optum.com',
      'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
    ),
  ]);

jest.useFakeTimers();
let props = {
  navigation: {
    addListener: jest.fn(),
  },
};

describe('api calls', () => {
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

  it('can render', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    const component = shallow(<ContactsList {...props} />);

    expect(component).toBeTruthy();
    expect(mockSelectorState).toBeCalled();
    expect(mockDispatchState).toBeCalled();
    expect(mockEffect).toBeCalled();
  });

  it('can test press events', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    const component = shallow(<ContactsList {...props} />);

    component.find(TouchableOpacity).first().props().onPress();

    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockDispatchState).toBeCalled();
    expect(mockEffect).toBeCalled();
  });
});
