import React from 'react';
import {StyleSheet, View, Text, Platform, Dimensions} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text allowFontScaling={false} style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: '#3b5998',
    ...Platform.select({
      ios: {
        height: 100,
        paddingTop: Dimensions.get('window').width > 400 ? 50 : 25,
        paddingBottom: 20,
      },
      android: {
        height: 60,
        paddingBottom: 10,
      },
    }),
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});

export default Header;
