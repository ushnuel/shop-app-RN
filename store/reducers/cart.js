import * as actionTypes from '../actions/actionTypes';
import Cart from '../../models/CartItem';

const initialState = {
  items: {},
  totalAmount: 0,
};

const addProductToCart = (state, action) => {
  const newProduct = action.product;
  const title = newProduct.title;
  const price = newProduct.price;

  let updatedOrNewItem;

  if (state.items[newProduct.id]) {
    updatedOrNewItem = new Cart(
      state.items[newProduct.id].quantity + 1,
      price,
      title,
      state.items[newProduct.id].sum + price,
    );
  } else {
    updatedOrNewItem = new Cart(1, price, title, price);
  }
  return {
    ...state,
    items: { ...state.items, [newProduct.id]: updatedOrNewItem },
    totalAmount: state.totalAmount + price,
  };
};

const removeProductFromCart = (state, action) => {
  const selectedCartItem = state.items[action.pId];
  let updatedCartItems;
  if (selectedCartItem.quantity > 1) {
    //remove only one item
    const updatedCartItem = new Cart(
      selectedCartItem.quantity - 1,
      selectedCartItem.price,
      selectedCartItem.title,
      selectedCartItem.sum - selectedCartItem.price,
    );
    updatedCartItems = { ...state.items, [action.pId]: updatedCartItem };
  } else {
    updatedCartItems = { ...state.items };
    delete updatedCartItems[action.pId];
  }
  return { ...state, items: updatedCartItems, totalAmount: state.totalAmount - selectedCartItem.price };
};

const deleteProduct = (state, action) => {
  if (!state.items[action.pId]) {
    return state;
  }
  const updatedItems = { ...state.items };
  const itemTotal = updatedItems[action.pId].sum;
  delete updatedItems[action.pId];

  return { ...state, items: updatedItems, totalAmount: state.totalAmount - itemTotal };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return addProductToCart(state, action);
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return removeProductFromCart(state, action);
    case actionTypes.ADD_ORDER:
      return initialState;
    case actionTypes.DELETE_PRODUCT:
      return deleteProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
