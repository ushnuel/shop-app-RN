import * as actionTypes from '../actions/actionTypes';
// import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/Product';

const initialState = {
  availableProducts: [],
  userProducts: [],
};

const deleteProduct = (state, action) => {
  const updatedUserProducts = state.userProducts.filter((userProducts) => userProducts.id !== action.pId);
  const updatedAvailableProducts = state.availableProducts.filter((product) => product.id !== action.pId);
  return { ...state, userProducts: updatedUserProducts, availableProducts: updatedAvailableProducts };
};

const createProduct = (state, action) => {
  const newProduct = new Product(
    action.id,
    action.ownerId,
    action.title,
    action.imageUrl,
    action.description,
    action.price,
  );
  return {
    ...state,
    availableProducts: state.availableProducts.concat(newProduct),
    userProducts: state.userProducts.concat(newProduct),
  };
};

const updateProduct = (state, action) => {
  const productIndex = state.userProducts.findIndex((prod) => prod.id === action.id);
  const availableProductIndex = state.availableProducts.findIndex((prod) => prod.id === action.id);

  const updatedProduct = new Product(
    action.id,
    state.userProducts[productIndex].ownerId,
    action.title,
    action.imageUrl,
    action.description,
    state.userProducts[productIndex].price,
  );
  const updatedUserProducts = [...state.userProducts];
  updatedUserProducts[productIndex] = updatedProduct;

  const updatedAvailableProduct = new Product(
    action.id,
    state.availableProducts[availableProductIndex].ownerId,
    action.title,
    action.imageUrl,
    action.description,
    state.availableProducts[availableProductIndex].price,
  );
  const updatedAvailableProducts = [...state.availableProducts];
  updatedAvailableProducts[availableProductIndex] = updatedAvailableProduct;
  return { ...state, userProducts: updatedUserProducts, availableProducts: updatedAvailableProducts };
};

export const fetchProduct = (action) => {
  return {
    availableProducts: action.products,
    userProducts: action.userProducts,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCT:
      return fetchProduct(action);
    case actionTypes.DELETE_PRODUCT:
      return deleteProduct(state, action);
    case actionTypes.CREATE_PRODUCT:
      return createProduct(state, action);
    case actionTypes.UPDATE_PRODUCT:
      return updateProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
