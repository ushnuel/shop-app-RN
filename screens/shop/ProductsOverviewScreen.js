import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Button, Alert, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import CenterItem from '../../components/UI/CenterItem';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(actionCreators.fetchProducts());
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener('willFocus', loadProducts);

    return () => {
      willFocusSubscription.remove();
    };
  });

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts, setIsLoading]);

  const onSelectHandler = (id, title) => {
    props.navigation.navigate('ProductDetails', { productId: id, productTitle: title });
  };

  const goToCart = () => {
    props.navigation.navigate('ProductCart');
  };

  const onAddProductToCartHandler = (item) => {
    dispatch(actionCreators.addProductToCart(item));
    Alert.alert('Product added to cart successfully', 'View added products?', [
      {
        text: 'view cart',
        style: 'default',
        onPress: () => {
          goToCart();
        },
      },
      {
        text: 'cancel',
        style: 'cancel',
      },
    ]);
  };

  if (error) {
    return (
      <CenterItem>
        <Text style={styles.errorMsg}>{error.message}</Text>
        <Button title='try again' color={Colors.primary} onPress={loadProducts} />
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

  if (!isLoading && products.length === 0) {
    return (
      <CenterItem>
        <Text>There is no products to display, consider creating one!</Text>
      </CenterItem>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          price={item.price}
          title={item.title}
          onSelect={() => onSelectHandler(item.id, item.title)}
        >
          <Button title='View Product' color={Colors.primary} onPress={() => onSelectHandler(item.id, item.title)} />
          <Button
            title='Add to Cart'
            color={Colors.primary}
            onPress={() => {
              onAddProductToCartHandler(item);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName='md-cart'
          title='Cart'
          onPress={() => {
            navData.navigation.navigate('ProductCart');
          }}
        />
      </HeaderButtons>
    ),
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
  errorMsg: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    marginBottom: 10,
  },
});

export default ProductsOverviewScreen;
