import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ContactsList from '../screens/ContactsList';
import ContactDetails from '../screens/ContactDetails';
import WebViewScreen from '../screens/WebViewScreen';

const ContactsNavigator = createStackNavigator({
  Clist: {
    screen: ContactsList,
    navigationOptions: () => ({
      title: 'Dashboard',
    }),
  },
  Details: {
    screen: ContactDetails,
    params: {tabBarVisible: false},
    navigationOptions: () => ({
      title: 'Details',
      headerBackTitle: 'Back',
    }),
  },
  WebScreen: {
    screen: WebViewScreen,
    params: {tabBarVisible: false},
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
});

export default createAppContainer(ContactsNavigator);
