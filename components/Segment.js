import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Segment = (props) => {
  const data = props.data.item;
  return (
    <View style={styles.segment}>
      <Text ellipsizeMode="tail" numberOfLines={2} adjustsFontSizeToFit>
        {data.link}
      </Text>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  segment: {
    width: '100%',
    paddingBottom: 35,
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Segment;
