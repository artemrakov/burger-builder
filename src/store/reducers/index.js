import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { combineReducers } from 'redux';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialIngredients = {
  salad: 0,
  cheese: 0,
  meat: 0,
  bacon: 0
};

const ingredients = handleActions({
  [actions.addIngredient](state, { payload: { ingredient } }) {
    return { ...state, [ingredient]: state[ingredient] + 1 };
  },
  [actions.removeIngredient](state, { payload: { ingredient } }) {
    return { ...state, [ingredient]: state[ingredient] - 1 };
  }
}, initialIngredients);

const totalPrice = handleActions({
  [actions.addIngredient](state, { payload: { ingredient } }) {
    return state + INGREDIENT_PRICES[ingredient];
  },
  [actions.removeIngredient](state, { payload: { ingredient } }) {
    return state - INGREDIENT_PRICES[ingredient];
  }
}, 4)

export default combineReducers({
  ingredients,
  totalPrice
});
