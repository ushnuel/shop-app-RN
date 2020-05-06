import * as actionTypes from './actionTypes';

export const addProductToCart = (product) => {
  return { type: actionTypes.ADD_PRODUCT_TO_CART, product };
};

export const removeProductFromCart = (pId) => {
  return { type: actionTypes.REMOVE_PRODUCT_FROM_CART, pId };
};
