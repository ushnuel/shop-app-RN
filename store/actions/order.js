import * as actionTypes from './actionTypes';
import Orders from '../../models/Orders';

const baseUrl = 'https://rn-complete-guide-e9eef.firebaseio.com/';

export const addOrder = (items, amount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const date = new Date();
    const response = await fetch(baseUrl + `orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        amount,
        date: date.toISOString(),
        ownerId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Something was wrong');
    }
    const resData = await response.json();
    dispatch({
      type: actionTypes.ADD_ORDER,
      id: resData.name,
      items,
      amount,
      date,
      ownerId: userId,
    });
  };
};

export const clearOrder = () => {
  return { type: actionTypes.CLEAR_ORDER };
};

export const setOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(baseUrl + `orders/${userId}.json`);

      if (!response.ok) {
        throw new Error('Something bad happened');
      }
      const resData = await response.json();

      const loadedOrders = [];

      for (let key in resData) {
        loadedOrders.push(new Orders(key, resData[key].items, resData[key].amount, new Date(resData[key].date)));
      }
      dispatch({ type: actionTypes.SET_ORDER, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};
