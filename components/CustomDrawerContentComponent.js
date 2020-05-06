import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, Button, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';

import * as actionCreators from '../store/actions';

const customComponent = (props) => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(actionCreators.logout());
  };

  return (
    <ScrollView style={styles.screen}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.profile}>
          <View style={styles.profileImageContainer}>
            <Image source={require('../assets/usher.jpg')} style={styles.profileImage} />
          </View>
          <Text style={styles.profileText}>Welcome Usher!</Text>
        </View>

        <DrawerItems {...props} />

        <View style={styles.button}>
          <Button title='logout' onPress={logOutHandler} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  profile: {
    backgroundColor: '#ffe3ff',
    padding: 10,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
  },
  profileText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    marginVertical: 10,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
export default customComponent;
