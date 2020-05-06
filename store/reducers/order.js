import Order from '../../models/Orders';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
};

const addOrder = (state, action) => {
  const newOrder = new Order(action.id, action.items, action.amount, action.date);
  const updatedOrder = state.orders.concat(newOrder);
  return { ...state, orders: updatedOrder };
};

const setOrders = (action) => {
  return { orders: action.orders };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      return addOrder(state, action);
    case actionTypes.SET_ORDER:
      return setOrders(action);
    default:
      return state;
  }
};

export default reducer;
