import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
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
  const [loading, setLoading] = useState(false);

  const { setIngredients } = props;

  useEffect(() => {
    setIngredients();
  }, [setIngredients])

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.setAuthRedirect({ path: '/checkout' });
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
    const { addIngredient } = props;
    addIngredient({ ingredient: type });
    updatePurchaseState(props.ingredients);
  }

  const removeIngredientHandler = (type) => (e) => {
    e.preventDefault();
    if (props.ingredients[type] <= 0) {
      return;
    }
    const { removeIngredient } = props;
    removeIngredient({ ingredient: type });
    updatePurchaseState(props.ingredients);
  }

  const orderSummary = () => {
    const ingredients = props.ingredients;

    if (ingredients && !loading) {
      return <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        price={props.totalPrice} />

    } else {
      return <Spinner />
    }
  }

  const burgerAndBuildControls = () => {
    const ingredients = props.ingredients;

    if (ingredients) {
      const disabledInfo = Object.keys(ingredients)
        .reduce((acc, type) => ({ ...acc, [type]: ingredients[type] <= 0 }), {})
      return (
        <>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            price={props.totalPrice}
            disabled={disabledInfo}
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            purchasable={purchasable}
            ordered={purchaseHandler}
            isAuth={props.isAuth}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuth: state.auth.token !== null
  }
};

const actionsCreators = {
  addIngredient: actions.addIngredient,
  removeIngredient: actions.removeIngredient,
  setIngredients: actions.setIngredients,
  setAuthRedirect: actions.authRedirect
};

export default connect(mapStateToProps, actionsCreators)(withErrorHandler(BurgerBuilder, axios));
