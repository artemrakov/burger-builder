import { handleActions } from 'redux-actions';
import * as actions from '../actions/burgerBuilder';
import { combineReducers } from 'redux';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const ingredients = handleActions({
  [actions.addIngredient](state, { payload: { ingredient } }) {
    return { ...state, [ingredient]: state[ingredient] + 1 };
  },
  [actions.removeIngredient](state, { payload: { ingredient } }) {
    return { ...state, [ingredient]: state[ingredient] - 1 };
  },
  [actions.setIngredientsSuccess](state, { payload: { ingredients } }) {
    return {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.meat
    };
  }
}, {});

const totalPrice = handleActions({
  [actions.addIngredient](state, { payload: { ingredient } }) {
    return state + INGREDIENT_PRICES[ingredient];
  },
  [actions.removeIngredient](state, { payload: { ingredient } }) {
    return state - INGREDIENT_PRICES[ingredient];
  }
}, 4)

const error = handleActions({
  [actions.setIngredientsSuccess](state) {
    return false;
  },
  [actions.setIngredientsFailed](state) {
    return true;
  }
}, false)

export default combineReducers({
  ingredients,
  totalPrice,
  error
});
