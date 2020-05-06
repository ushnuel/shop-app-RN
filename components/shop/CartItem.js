import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.amount}>AMT: ${props.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>SUM: ${props.sum.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity onPress={props.onRemove} style={styles.deleteAction}>
            <Ionicons name='md-trash' size={23} color='red' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  itemData: {
    flexDirection: 'row',
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'open-sans',
    marginRight: 5,
    color: '#888',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'open-sans',
    marginLeft: 5,
  },
  deleteAction: {
    marginLeft: 10,
  },
});
export default cartItem;
