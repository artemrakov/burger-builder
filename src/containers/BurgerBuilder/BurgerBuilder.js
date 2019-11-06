import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    puchasable: false,
    purchasing: false
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = async () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Artem Rakov',
        address: {
          street: 'Test',
          zipCode: '312123',
          country: 'Canada'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    const response = await axios.post('/orders.json', order);
    console.log(response)
  }

  updatePurchaseState = (updatedIngredients) => {
    const countOfIngredientsAdded =  Object.keys(updatedIngredients).reduce((acc, type) => acc + updatedIngredients[type], 0)
    this.setState({ purchasable: countOfIngredientsAdded > 0 })
  }

  addIngredientHandler = (type) => (e) => {
    e.preventDefault();
    const updatedIngredients  = { ...this.state.ingredients, [type]: this.state.ingredients[type] + 1 };
    const updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    this.updatePurchaseState(updatedIngredients);
  }


  removeIngredientHandler = (type) => (e) => {
    e.preventDefault();
    if (this.state.ingredients[type] <= 0) {
      return;
    }

    const updatedIngredients  = { ...this.state.ingredients, [type]: this.state.ingredients[type] - 1 }
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const disabledInfo = Object.keys(this.state.ingredients)
                               .reduce((acc, type) => ({ ...acc, [type]: this.state.ingredients[type] <= 0 }), {})

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          />
      </>
    )
  }
}

export default BurgerBuilder;
