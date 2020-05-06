import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Fonts from 'expo-font';
import thunk from 'redux-thunk';

import ProductReducer from './store/reducers/product';
import CartReducer from './store/reducers/cart';
import OrderReducer from './store/reducers/order';
import AuthReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';

const fetchFont = () => {
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={() => setFontsLoaded(true)} />;
  }

  const rootReducer = combineReducers({
    products: ProductReducer,
    cart: CartReducer,
    orders: OrderReducer,
    auth: AuthReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
