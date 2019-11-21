import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders.js';

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
};

const actionsCreators = {
  addIngredient: actions.addIngredient,
  removeIngredient: actions.removeIngredient
};

class BurgerBuilder extends React.Component {
  state = {
    puchasable: false,
    purchasing: false,
    loading: false
  }

  async componentDidMount() {
    // this.setState({ loading: true });
    // const response = await axios.get('https://burder-builder-82f40.firebaseio.com/ingredients.json');
    //
    // if (response) {
    //   this.setState({ ingredients: response.data, loading: false });
    // }
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  updatePurchaseState = (updatedIngredients) => {
    const countOfIngredientsAdded =  Object.keys(updatedIngredients).reduce((acc, type) => acc + updatedIngredients[type], 0)
    this.setState({ purchasable: countOfIngredientsAdded > 0 })
  }

  addIngredientHandler = (type) => (e) => {
    e.preventDefault();
    const { addIngredient } = this.props;
    addIngredient({ ingredient: type });
    this.updatePurchaseState(this.props.ingredients);
  }


  removeIngredientHandler = (type) => (e) => {
    e.preventDefault();
    if (this.props.ingredients[type] <= 0) {
      return;
    }
    const { removeIngredient } = this.props;
    removeIngredient({ ingredient: type });
    this.updatePurchaseState(this.props.ingredients);
  }

  orderSummary() {
    const loading = this.state.loading;
    const ingredients = this.props.ingredients;

    if (ingredients && !loading) {
      return <OrderSummary
               ingredients={ingredients}
               purchaseCancelled={this.purchaseCancelHandler}
               purchaseContinue={this.purchaseContinueHandler}
               price={this.props.totalPrice} />

    } else {
      return <Spinner />
    }
  }

  burgerAndBuildControls() {
    const ingredients = this.props.ingredients;

    if (ingredients) {
      const disabledInfo = Object.keys(ingredients)
                                 .reduce((acc, type) => ({ ...acc, [type]: ingredients[type] <= 0 }), {})
      return (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
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

export default connect(mapStateToProps, actionsCreators)(withErrorHandler(BurgerBuilder, axios));
