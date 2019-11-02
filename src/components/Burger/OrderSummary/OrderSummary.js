import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
                                    .map(type => <li key={type}><span style={{textTransform: 'capitalize'}}>{type}</span>: {this.props.ingredients[type]} </li>)
    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinue}>Continue</Button>
      </>
    );
  }
};

export default OrderSummary;
