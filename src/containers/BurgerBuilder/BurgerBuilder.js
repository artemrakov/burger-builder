import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders.js';

const BurgerBuilder = props => {
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading] = useState(false);

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const isAuth = useSelector(state => state.auth.token !== null);

  const dispatch = useDispatch();
  const addIngredient = (data) => dispatch(actions.addIngredient(data));
  const removeIngredient = (data) => dispatch(actions.removeIngredient(data));
  const setIngredients = useCallback((data) => dispatch(actions.setIngredients(data)), [dispatch]);
  const setAuthRedirect = (data) => dispatch(actions.authRedirect(data));

  useEffect(() => {
    setIngredients();
  }, [setIngredients])

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing(true);
    } else {
      setAuthRedirect({ path: '/checkout' });
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.history.push('/checkout')
  }

  const updatePurchaseState = (updatedIngredients) => {
    const countOfIngredientsAdded =  Object.keys(updatedIngredients).reduce((acc, type) => acc + updatedIngredients[type], 0)
    setPurchasable(countOfIngredientsAdded > 0);
  }

  const addIngredientHandler = (type) => (e) => {
    e.preventDefault();
    addIngredient({ ingredient: type });
    updatePurchaseState(ingredients);
  }

  const removeIngredientHandler = (type) => (e) => {
    e.preventDefault();
    if (ingredients[type] <= 0) {
      return;
    }
    removeIngredient({ ingredient: type });
    updatePurchaseState(ingredients);
  }

  const orderSummary = () => {
    if (ingredients && !loading) {
      return <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        price={totalPrice} />

    } else {
      return <Spinner />
    }
  }

  const burgerAndBuildControls = () => {
    if (ingredients) {
      const disabledInfo = Object.keys(ingredients)
        .reduce((acc, type) => ({ ...acc, [type]: ingredients[type] <= 0 }), {})
      return (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            price={totalPrice}
            disabled={disabledInfo}
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            purchasable={purchasable}
            ordered={purchaseHandler}
            isAuth={isAuth}
          />
      </>
      );
    } else {
      return <Spinner />
    }
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary()}
      </Modal>
      {burgerAndBuildControls()}
    </>
  )
}



export default withErrorHandler(BurgerBuilder, axios);
