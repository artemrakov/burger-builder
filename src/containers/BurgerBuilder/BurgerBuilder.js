import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders.js';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    puchasable: false,
    purchasing: false,
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get('https://burder-builder-82f40.firebaseio.com/ingredients.json');

    if (response) {
      this.setState({ ingredients: response.data, loading: false });
    }
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = async () => {
    const queryParams = Object.keys(this.state.ingredients).map(key => {
     return encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key])
    });

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
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

  orderSummary() {
    const loading = this.state.loading;
    const ingredients = this.state.ingredients;

    if (ingredients && !loading) {
      return <OrderSummary
               ingredients={ingredients}
               purchaseCancelled={this.purchaseCancelHandler}
               purchaseContinue={this.purchaseContinueHandler}
               price={this.state.totalPrice} />

    } else {
      return <Spinner />
    }
  }

  burgerAndBuildControls() {
    const ingredients = this.state.ingredients;

    if (ingredients) {
      const disabledInfo = Object.keys(ingredients)
                                 .reduce((acc, type) => ({ ...acc, [type]: ingredients[type] <= 0 }), {})
      return (
        <>
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
      );
    } else {
      return <Spinner />
    }
  }

  render() {
    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {this.orderSummary()}
        </Modal>
        {this.burgerAndBuildControls()}
      </>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
