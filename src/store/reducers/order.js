import { handleActions } from 'redux-actions';
import * as actions from '../actions/order';
import { combineReducers } from 'redux';

const purchaseBurgerRequest = handleActions({
  [actions.purchaseBurgerRequest]() {
    return 'requested';
  },
  [actions.purchaseBurgerSuccess]() {
    return 'complete';
  },
  [actions.purchaseBurgerFailed]() {
    return 'failed';
  }
}, 'none');

const fetchOrdersRequest  = handleActions({
  [actions.fetchOrdersRequest]() {
    return 'requested';
  },
  [actions.fetchOrdersSuccess]() {
    return 'complete';
  },
  [actions.fetchOrdersFailed]() {
    return 'failed';
  }
}, 'none');

const orders = handleActions({
  [actions.purchaseBurgerSuccess](state, { payload: { id, order } }) {
    const newOrder = { id, ...order };
    return [ newOrder, ...state ];
  },
  [actions.fetchOrdersSuccess](state, { payload: { orders } }) {
    return orders;
  }
}, []);


export default combineReducers({
  purchaseBurgerRequest,
  fetchOrdersRequest,
  orders
})
