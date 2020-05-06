import React, { useEffect } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import CenterItem from '../components/UI/CenterItem';
import * as actionCreators from '../store/actions';
import Colors from '../constants/Colors';

const startUpScreen = (props) => {
  const dispatch = useDispatch();

  const onAppStartUpHandler = async () => {
    const userData = await AsyncStorage.getItem('userData');

    if (!userData) {
      props.navigation.navigate('Auth');
      return;
    }

    const { token, userId, expiryDate } = JSON.parse(userData);
    const expirationDate = new Date(expiryDate);

    if (!token || !userId || expirationDate <= new Date()) {
      props.navigation.navigate('Auth');
      return;
    }

    const expirationTime = expirationDate.getTime() - new Date().getTime();
    props.navigation.navigate('Shop');
    dispatch(actionCreators.autoSignInUser(token, userId, expirationTime));
  };

  useEffect(() => {
    onAppStartUpHandler();
  }, [onAppStartUpHandler]);

  return (
    <CenterItem>
      <ActivityIndicator size='large' color={Colors.primary} />
    </CenterItem>
  );
};

export default startUpScreen;
