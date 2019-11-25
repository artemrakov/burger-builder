import { createAction } from 'redux-actions';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = createAction('PURCHASE_BURGER_SUCCESS');
export const purchaseBurgerFailed = createAction('PURCHASE_BURGER_FAILURE');
export const purchaseBurgerRequest = createAction('PURCHASE_BURGER_REQUEST');

export const purchaseBurger = (order) => async (dispatch) => {
  dispatch(purchaseBurgerRequest());
  try {
    const response = await axios.post('/orders.json', order);
    const newOrder = { id: response.data.name, ...order };
    dispatch(purchaseBurgerSuccess({ order: newOrder }));
  } catch (e) {
    dispatch(purchaseBurgerFailed({ error: e }));
  }
};

export const fetchOrdersSuccess = createAction('FETCH_ORDERS_SUCCESS');
export const fetchOrdersFailed = createAction('FETCH_ORDERS_FAILED');
export const fetchOrdersRequest = createAction('FETCH_ORDERS_REQUEST');

export const fetchOrders = () => async (dispatch) => {
  dispatch(fetchOrdersRequest());
  try {
    const response = await axios.get('/orders.json');
    const orders = Object.keys(response.data).map((key) => {
      return { id: key, ...response.data[key] }
    });
    dispatch(fetchOrdersSuccess({ orders }));
  } catch {
    dispatch(fetchOrdersFailed());
  }
};
