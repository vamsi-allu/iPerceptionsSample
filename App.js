import React from 'react';
import TabFavNavigator from './navigation/ContactsNavigator';
import {createStore, combineReducers} from 'redux';
import ContactReducer from './store/reducers/contacts';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  contactsList: ContactReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

const App = (props) => {
  return (
    <Provider store={store}>
      <TabFavNavigator />
    </Provider>
  );
};

export default App;
