import React from 'react';
import { View, StyleSheet } from 'react-native';

const centerItem = (props) => {
  return <View style={styles.centerItem}>{props.children}</View>;
};

const styles = StyleSheet.create({
  centerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
export default centerItem;
