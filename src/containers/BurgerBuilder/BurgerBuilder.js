import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  addTypeHandler = (type) => (e) => {
    e.preventDefault();
    const updatedIngredients  = { ...this.state.ingredients, [type]: this.state.ingredients[type] + 1 };
    this.setState({ ingredients: updatedIngredients });
  }


  removeTypeHandler = (type) => (e) => {
    e.preventDefault();
    if (this.state.ingredients[type] > 0) {
      const updatedIngredients  = { ...this.state.ingredients, [type]: this.state.ingredients[type] - 1 }
      this.setState({ ingredients: updatedIngredients });
    }
  }

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls add={this.addTypeHandler} remove={this.removeTypeHandler} />
      </>
    )
  }
}

export default BurgerBuilder;
