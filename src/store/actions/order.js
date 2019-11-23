import { createAction } from 'redux-action';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = createAction('PURCHASE_BURGER_SUCCESS');
export const purchaseBurgerFailed = createAction('PURCHASE_BURGER_FAILURE');
export const purchaseBurgerRequest = createAction('PURCHASE_BURGER_REQUEST');

export const purchaseBurger = (order) => async (dispatch) => {
  dispatch(purchaseBurgerRequest());
  try {
    const response = await axios.post('/orders.json', order);
    dispatch(purchaseBurgerSuccess({ id: response.data, order }));
  } catch (e) {
    dispatch(purchaseBurgerFailed({ error: e }));
  }
};
