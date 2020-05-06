import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';
import * as actionCreators from '../../store/actions';
import CenterItem from '../../components/UI/CenterItem';

const orderProductScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      await dispatch(actionCreators.setOrders());
    } catch (error) {
      setError(error.message);
    }

    setIsRefreshing(false);
  }, [setError, setIsRefreshing, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [loadOrders, setIsLoading]);

  if (error) {
    return (
      <CenterItem>
        <Text style={styles.message}>{error}</Text>
        <Button title='try again' color={Colors.primary} onPress={loadOrders} />
      </CenterItem>
    );
  }

  if (isLoading) {
    return (
      <CenterItem>
        <ActivityIndicator size='large' color={Colors.primary} />
      </CenterItem>
    );
  }

  if (!isLoading && orders.length <= 0) {
    return (
      <CenterItem>
        <Text style={styles.message}>You don't have any orders available!</Text>
        <Button
          title='ADD PRODUCTS'
          onPress={() => props.navigation.navigate('ProductsOverview')}
          color={Colors.primary}
        />
      </CenterItem>
    );
  }

  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
      data={orders}
      renderItem={({ item }) => <OrderItem amount={item.price} date={item.readable} items={item.items} />}
    />
  );
};

orderProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName='md-menu'
          title='Menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  message: {
    fontFamily: 'open-sans',
    fontSize: 18,
    marginBottom: 10,
  },
});
export default orderProductScreen;
