import React from 'react';

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
      <p>Continue to Checkout?</p>
    </>
  )
};

export default orderSummary;
