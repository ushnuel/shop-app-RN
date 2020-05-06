import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';

import * as actionCreators from '../../store/actions';
import Colors from '../../constants/Colors';

const productDetail = (props) => {
  const product = props.navigation.getParam('productId');

  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.products.availableProducts.find((prod) => product === prod.id));

  const goToCart = () => {
    props.navigation.navigate('ProductCart');
  };

  const onAddProductToCartHandler = (selectedProduct) => {
    dispatch(actionCreators.addProductToCart(selectedProduct));
    Alert.alert('Product added to cart successfully', 'View added products?', [
      {
        text: 'view products',
        style: 'default',
        onPress: () => {
          goToCart();
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.action}>
        <Button title='ADD TO CART' color={Colors.primary} onPress={() => onAddProductToCartHandler(selectedProduct)} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

productDetail.navigationOptions = (navData) => {
  const title = navData.navigation.getParam('productTitle');
  let headerTitle = title;

  if (headerTitle.length >= 22) {
    headerTitle = title.substring(0, 22) + '...';
  }
  return {
    headerTitle,
  };
};

const styles = StyleSheet.create({
  action: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'open-sans',
    color: '#888',
  },
  description: {
    marginHorizontal: 20,
    fontFamily: 'open-sans',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default productDetail;
