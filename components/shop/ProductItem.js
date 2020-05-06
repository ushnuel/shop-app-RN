import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

import Card from '../UI/Card';

const productItem = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.OS >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <TouchableComponent onPress={props.onSelect} activeOpacity={0.8}>
      <View style={styles.productsContainer}>
        <Card style={styles.products}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: props.image }} style={styles.image} />
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </Card>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    alignItems: 'center',
  },
  products: {
    borderRadius: 10,
    height: 300,
    width: '80%',
    margin: 20,
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  detail: {
    alignItems: 'center',
    height: '15%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    height: '25%',
    alignItems: 'center',
  },
});

export default productItem;
