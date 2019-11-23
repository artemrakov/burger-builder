import { handleActions } from 'redux-actions';
import * as actions from '../actions/order';
import { combineReducers } from 'redux';

const request = handleActions({
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

const orders = handleActions({
  [actions.purchaseBurgerSuccess](state, { payload: { id, order } }) {
    const newOrder = { id, ...order };
    return { newOrder, ...state };
  }
}, []);


export default combineReducers({
  request,
  orders
})
