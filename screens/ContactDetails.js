import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactDetails = (props) => {
  const contactId = props.navigation.state.params.itemId;

  return (
    <View style={styles.screen}>
      <Text>{contactId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactDetails;
