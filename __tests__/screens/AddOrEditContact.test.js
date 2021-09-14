import AddOrEditContact from '../../screens/AddOrEditContact';
import Contact from '../../models/contact';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';

Enzyme.configure({adapter: new Adapter()});

const mockEffect = jest.fn();

const mockAlert = jest.fn();

const mockDispatchFn = jest.fn();

const mockSelectorState = jest.fn();

const mockImagePicker = jest.fn();

const mockDispatchState = jest.fn().mockReturnValue(mockDispatchFn);

let props = {
  navigation: {
    state: {
      params: {
        item: {
          firstName: 'Ab',
          lastName: 'Devillers',
          phoneNumber: '1234567890',
          mailId: 'Ab.Devillers@optum.com',
          imageUri:
            'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
        },
      },
    },
  },
};

let response = {
  error: 'error',
};

describe('Add or edit contact', () => {
  beforeEach(() => {
    mockSelectorState.mockImplementation((callback) =>
      callback({
        contactsList: {
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

    mockEffect.mockImplementation((callback) => callback({}));

    mockAlert.mockImplementation((callback) => {});

    mockImagePicker.mockImplementation((options, callback) =>
      callback(response),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('can render', (done) => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    const component = shallow(<AddOrEditContact {...props} />);

    expect(component).toBeTruthy();
    setTimeout(() => {
      expect(mockSelectorState).toBeCalled();
      done();
    }, 5000);
  });

  it('can test press events', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockAlert).toBeCalledWith(
      'Error',
      'Contact already exists with same name',
      [
        {
          text: 'OK',
          style: 'destructive',
        },
      ],
    );
  });

  it('can test press events without data', async () => {
    response = {
      didCancel: true,
    };
    props = {
      navigation: {
        state: {
          params: {
            item: {},
          },
        },
      },
    };

    mockImagePicker.mockImplementation((options, callback) =>
      callback(response),
    );
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockDispatchState).toBeCalled();

    expect(mockAlert).toBeCalledWith('Error', 'First name is mandatory', [
      {
        text: 'OK',
        style: 'destructive',
      },
    ]);
  });

  it('can test press events with only first name', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        state: {
          params: {
            item: {
              firstName: 'Abd',
            },
          },
        },
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockDispatchState).toBeCalled();
    expect(mockAlert).toBeCalledWith('Error', 'Phone Number is mandatory', [
      {
        text: 'OK',
        style: 'destructive',
      },
    ]);
  });

  it('can test press events with invald phone number', async () => {
    response = {
      uri:
        'https://www.cricbuzz.com/a/img/v1/192x192/i1/c174146/t-natarajan.jpg',
    };
    props = {
      navigation: {
        state: {
          params: {
            item: {
              firstName: 'Abd',
              phoneNumber: 'abcdefghi',
            },
          },
        },
      },
    };

    mockImagePicker.mockImplementation((options, callback) =>
      callback(response),
    );
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockDispatchState).toBeCalled();
    expect(mockAlert).toBeCalledWith(
      'Error',
      'phone number should be numeric',
      [
        {
          text: 'OK',
          style: 'destructive',
        },
      ],
    );
  });

  it('can test press events with invalid mail Id', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        state: {
          params: {
            item: {
              firstName: 'Abd',
              phoneNumber: '123456789676',
              mailId: 'abcdef',
            },
          },
        },
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockDispatchState).toBeCalled();
    expect(mockAlert).toBeCalledWith('Error', 'Enter a valid mail', [
      {
        text: 'OK',
        style: 'destructive',
      },
    ]);
  });

  it('can test press events with id', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        state: {
          params: {
            item: {
              id: '1',
              firstName: 'Ab',
              lastName: 'Devillers',
              phoneNumber: '1234567890',
              mailId: 'Ab.Devillers@optum.com',
              imageUri:
                'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
            },
          },
        },
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockAlert).toBeCalled();
  });

  it('can test press events with id and new data', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        state: {
          params: {
            item: {
              id: '2',
              firstName: 'Chris',
              lastName: 'Devillers',
              phoneNumber: '987654635462',
              mailId: 'Chris.Devillers@optum.com',
              imageUri:
                'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
            },
          },
        },
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockAlert).toBeCalled();
  });

  it('can test press events without id and data with same phone number', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        state: {
          params: {
            item: {
              firstName: 'Christ',
              lastName: 'Devillers',
              phoneNumber: '1234567890',
              mailId: 'Christ.Devillers@optum.com',
              imageUri:
                'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
            },
          },
        },
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockAlert).toBeCalledWith(
      'Error',
      'Contact already exists with same phone Number',
      [
        {
          text: 'OK',
          style: 'destructive',
        },
      ],
    );
  });

  it('can test press events without id and new data', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        state: {
          params: {
            item: {
              firstName: 'Christ',
              lastName: 'Deviller',
              phoneNumber: '1234567895670',
              mailId: 'Christ.Deviller@optum.com',
              imageUri:
                'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170999/ab-de-villiers.jpg',
            },
          },
        },
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockAlert).toBeCalledWith(
      'Contact Saved',
      'Contact saved successfully',
      [
        {
          text: 'OK',
          style: 'destructive',
        },
      ],
    );
  });

  it('can test press events with empty props', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        addListener: jest.fn(),
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    component.find(TouchableOpacity).forEach((pressEvent) => {
      pressEvent.props().onPress();
    });

    expect(mockAlert).toBeCalledWith('Error', 'First name is mandatory', [
      {
        text: 'OK',
        style: 'destructive',
      },
    ]);
  });

  it('can trigger changeText for first name', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        addListener: jest.fn(),
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    const wrapper = component.dive();

    wrapper.find('#firstName').props().onChangeText();

    expect(mockDispatchState).toBeCalled();
  });

  it('can trigger changeText for last name', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        addListener: jest.fn(),
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    const wrapper = component.dive();

    wrapper.find('#lastName').props().onChangeText();

    expect(mockDispatchState).toBeCalled();
  });

  it('can trigger changeText for phone number', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        addListener: jest.fn(),
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    const wrapper = component.dive();

    wrapper.find('#phoneNumber').props().onChangeText();

    expect(mockDispatchState).toBeCalled();
  });

  it('can trigger changeText for mail', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(mockEffect);
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(mockSelectorState);
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(mockDispatchState);
    jest.spyOn(Alert, 'alert').mockImplementation(mockAlert);
    jest
      .spyOn(ImagePicker, 'showImagePicker')
      .mockImplementation(mockImagePicker);

    props = {
      navigation: {
        addListener: jest.fn(),
      },
    };

    const component = shallow(<AddOrEditContact {...props} />);
    const wrapper = component.dive();

    wrapper.find('#mailId').props().onChangeText();

    expect(mockDispatchState).toBeCalled();
  });
});
