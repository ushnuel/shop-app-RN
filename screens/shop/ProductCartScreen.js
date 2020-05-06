import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as actionCreators from '../../store/actions';

const productCartScreen = (props) => {
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productQuantity: state.cart.items[key].quantity,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(actionCreators.addOrder(cartItems, cartTotal));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error occured! Please try again', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.title}>
          Total: <Text style={styles.price}>${cartTotal.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button title='ORDER NOW' disabled={cartItems.length === 0} onPress={sendOrderHandler} />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            key={item.productId}
            amount={item.productPrice}
            quantity={item.productQuantity}
            sum={item.sum}
            deletable
            onRemove={() => {
              dispatch(actionCreators.removeProductFromCart(item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

productCartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Product Cart',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName='md-list'
          title='Menu'
          onPress={() => {
            navData.navigation.navigate('Orders');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
  },
  price: {
    color: Colors.primary,
  },
});
export default productCartScreen;
