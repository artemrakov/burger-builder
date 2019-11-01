import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    puchasable: false
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
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchasable={this.state.purchasable} />
      </>
    )
  }
}

export default BurgerBuilder;
