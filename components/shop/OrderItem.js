import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

const orderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  let details;

  if (showDetails) {
    details = (
      <View style={styles.details}>
        {props.items.map((cartItem) => (
          <CartItem
            amount={cartItem.productPrice}
            key={cartItem.productId}
            quantity={cartItem.productQuantity}
            sum={cartItem.sum}
          />
        ))}
      </View>
    );
  }

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.action}>
        <Button
          title={showDetails ? 'HIDE DETAILS' : 'SHOW DETAILS'}
          color={Colors.primary}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
      </View>
      {details}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: { fontFamily: 'open-sans', fontSize: 16, color: '#888' },
  action: {
    alignItems: 'center',
  },
});
export default orderItem;
