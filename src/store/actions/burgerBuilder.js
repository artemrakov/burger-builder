import { createAction } from 'redux-action';
import axios from '../../axios-orders';

export const addIngredient = createAction('INGREDIENT_ADD');
export const removeIngredient = createAction('INGREDIENT_REMOVE');
export const setIngredientsSuccess = createAction('INGREDIENTS_SET_SUCCESS');
export const setIngredientsFailed = createAction('INGREDIENTS_SET_FAILURE');

export const setIngredients = () => async (dispatch) => {
  try {
    const response = await axios.get('https://burder-builder-82f40.firebaseio.com/ingredients.json');
    dispatch(setIngredientsSuccess({ ingredients: response.data }));
  } catch (e) {
    dispatch(setIngredientsFailed());
  }
};
