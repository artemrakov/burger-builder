import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
                                  .map(type => <li key={type}><span style={{textTransform: 'capitalize'}}>{type}</span>: {props.ingredients[type]} </li>)
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType='Success' clicked={props.purchaseContinue}>Continue</Button>
    </>
  )
};

export default orderSummary;
