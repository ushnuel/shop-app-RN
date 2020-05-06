import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/CustomHeaderButton';
import * as actionCreators from '../../store/actions';
import Input from '../../components/UI/Input';
import CenterItem from '../../components/UI/CenterItem';
import Colors from '../../constants/Colors';
import FormReducer from '../../store/reducers/form';
import { FORM_INPUT_REDUCER } from '../../store/actions/actionTypes';

const editProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) => state.products.userProducts.find((product) => product.id === prodId));

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(FormReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidites: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formValidity: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    const { formValidity, inputValues } = formState;
    if (!formValidity) {
      Alert.alert('Input Validation Failed', 'One or more input fields failed validation, please try again!', [
        { text: 'okay' },
      ]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(
          actionCreators.updateProduct(prodId, inputValues.title, inputValues.imageUrl, inputValues.description),
        );
      } else {
        await dispatch(
          actionCreators.createProduct(
            inputValues.title,
            inputValues.imageUrl,
            inputValues.description,
            Number(inputValues.price),
          ),
        );
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_REDUCER,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  if (isLoading) {
    <CenterItem>
      <ActivityIndicator color={Colors.primary} size='large' />
    </CenterItem>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={150}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            label='Title'
            id='title'
            errorText='Please enter a valid title'
            autoCapitalize='sentences'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            label='Image Url'
            id='imageUrl'
            errorText='Please enter a valid image url'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              label='Price'
              id='price'
              errorText='Please enter a valid price'
              keyboardType='decimal-pad'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            label='Description'
            id='description'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            errorText='Please enter a valid description'
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

editProductScreen.navigationOptions = (navData) => {
  const productId = navData.navigation.getParam('productId');
  const submitFxn = navData.navigation.getParam('submit');
  return {
    headerTitle: productId ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-checkmark' title='Save' onPress={submitFxn} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
export default editProductScreen;
