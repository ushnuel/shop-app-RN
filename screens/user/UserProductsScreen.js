import React, { useEffect, useState } from 'react';
import { FlatList, Button, Alert, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import CenterItem from '../../components/UI/CenterItem';
import Colors from '../../constants/Colors';
import * as actionCreators from '../../store/actions';

const userProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const onSelectHandler = (id, title) => {
    props.navigation.navigate('ProductDetails', { productId: id, productTitle: title });
  };

  const deleteProduct = async (id) => {
    setError(null);
    try {
      await dispatch(actionCreators.deleteProduct(id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Operation Failed!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const onDeleteHandler = async (id) => {
    Alert.alert('Delete this product', 'Are you sure you want to delete this item?', [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'Ok',
        style: 'destructive',
        onPress: () => {
          deleteProduct(id);
        },
      },
    ]);
  };

  if (userProducts.length <= 0) {
    return (
      <CenterItem>
        <Text style={styles.message}>You have not created any products!</Text>
      </CenterItem>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          key={item.id}
          onSelect={() => onSelectHandler(item.id, item.title)}
        >
          <Button
            title='Edit'
            color={Colors.primary}
            onPress={() => {
              props.navigation.navigate('EditProduct', { productId: item.id });
            }}
          />
          <Button title='Delete' color={Colors.primary} onPress={onDeleteHandler.bind(this, item.id)} />
        </ProductItem>
      )}
    />
  );
};

userProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-menu' title='User Products' onPress={() => navData.navigation.toggleDrawer()} />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='ios-create' title='Create Product' onPress={() => navData.navigation.navigate('EditProduct')} />
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

export default userProductsScreen;
