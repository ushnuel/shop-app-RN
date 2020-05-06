import { AsyncStorage } from 'react-native';
import * as actionTypes from './actionTypes';

const token = 'AIzaSyDH3t20r8_bP9Hl1-6T6VtMJOtab1_hyRw';
const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
let timer;

export const autoSignInUser = (token, userId, expirationTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({ type: actionTypes.AUTO_SIGN_IN, token, userId });
  };
};

export const logout = () => {
  return async (dispatch) => {
    clearLogoutTimer();
    await AsyncStorage.removeItem('userData');
    dispatch({ type: actionTypes.LOGOUT });
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authenticate = (email, password, type) => {
  return async (dispatch) => {
    const url = type === 'SIGNUP' ? signUpUrl : signInUrl;

    const response = await fetch(`${url}${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      let message = 'Something went wrong';
      const errorId = errorResData.error;

      if (errorId.message === 'INVALID_PASSWORD') {
        message = 'This password is not valid';
      }
      if (errorId.message === 'EMAIL_EXISTS') {
        message = 'Email already exists, sign in instead';
      }
      if (errorId.message === 'EMAIL_NOT_FOUND') {
        message = 'No user with the corresponding email was found';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const expirationTime = Number(resData.expiresIn) * 1000;
    const expirationDate = new Date(new Date().getTime() + expirationTime).toISOString();

    dispatch(autoSignInUser(resData.idToken, resData.localId, expirationTime));
    saveUserDataToLocalStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveUserDataToLocalStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate,
    }),
  );
};
