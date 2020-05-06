import * as actionTypes from './actionTypes';
import Product from '../../models/Product';

const baseUrl = 'https://rn-complete-guide-e9eef.firebaseio.com/';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(baseUrl + `products.json`);

      if (!response.ok) {
        throw new Error('Something wrong, products could not be loaded');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }

      dispatch({
        type: actionTypes.SET_PRODUCT,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (pId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(baseUrl + `products/${pId}.json?auth=${token}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    dispatch({ type: actionTypes.DELETE_PRODUCT, pId, ownerId: userId });
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(baseUrl + `products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
        price,
        ownerId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();
    dispatch({
      type: actionTypes.CREATE_PRODUCT,
      id: resData.name,
      title,
      imageUrl,
      description,
      price,
      ownerId: userId,
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(baseUrl + `products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    dispatch({ type: actionTypes.UPDATE_PRODUCT, id, title, imageUrl, description, ownerId: userId });
  };
};
