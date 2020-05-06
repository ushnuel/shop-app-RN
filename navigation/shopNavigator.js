import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductCartScreen from '../screens/shop/ProductCartScreen';
import OrderProductScreen from '../screens/shop/OrderProductScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/UserEditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent';
import Color from '../constants/Colors';

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Color.primary,
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
    },
    headerTintColor: 'white',
  },
};

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen,
    ProductCart: ProductCartScreen,
  },
  defaultNavigationOptions,
);

const OrderNavigator = createStackNavigator(
  {
    Orders: OrderProductScreen,
  },
  defaultNavigationOptions,
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    ProductDetails: ProductDetailScreen,
    EditProduct: EditProductScreen,
  },
  defaultNavigationOptions,
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductNavigator,
      navigationOptions: {
        drawerIcon: (data) => {
          return <MaterialCommunityIcons name='shopify' size={25} color={data.tintColor} />;
        },
        title: 'All Products',
      },
    },
    Orders: {
      screen: OrderNavigator,
      navigationOptions: {
        drawerIcon: (data) => {
          return <FontAwesome name='first-order' size={25} color={data.tintColor} />;
        },
        title: 'My Orders',
      },
    },
    UserProducts: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerIcon: (data) => {
          return <Ionicons name='md-create' size={25} color={data.tintColor} />;
        },
        title: 'Admin',
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Color.primary,
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
    contentComponent: CustomDrawerContentComponent,
    drawerType: 'slide',
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  defaultNavigationOptions,
);

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
