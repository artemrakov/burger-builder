import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const mapStateToProps = (state) => {
  return { ingredients: state.burgerBuilder.ingredients }
}

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  return (
    <div>
      <CheckoutSummary
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
        ingredients={props.ingredients} />
      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData} />
    </div>
  );
}


export default connect(mapStateToProps)(Checkout);

