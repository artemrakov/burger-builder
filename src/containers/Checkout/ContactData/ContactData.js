import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import * as actions from '../../../store/actions';
import { checkValidity } from '../../../shared/utility';

const ContactData = props => {
  const [orderForm, setOrderForm] =  useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      valid: true,
      validation: {}
    }
  })

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = async (e) => {
    e.preventDefault();
    const formData = Object.keys(orderForm).reduce((acc, key) => {
      return { ...acc, [key]: orderForm[key].value }
    }, {});

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId
    };

    props.purchaseBurger(order, props.token);
    props.history.push('/');
  }

  const inputChangedHandler = (id) => (e) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[id] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[id] = updatedFormElement;

    const formIsValidCheck = checkValidationOfTheForm(updatedOrderForm);

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValidCheck);
  }

  const checkValidationOfTheForm = (form) => {
    const validity = Object.keys(form).map(key => form[key].valid);
    return validity.every(e => e === true)
  };

  const form = () => {
    const request = props.request;

    if (request === 'requested') {
      return <Spinner />
    }

    if (request === 'failed') {
      return (
        <span>Please, reload the page!</span>
      );
    }

    const formElements = Object.keys(orderForm).map((key) => {
      const formElement = orderForm[key];
      return (
        <Input
          key={key}
          changed={inputChangedHandler(key)}
          elementType={formElement.elementType}
          elementConfig={formElement.elementConfig}
          value={formElement.value}
          touched={formElement.touched}
          shouldValidate={formElement.validation}
          invalid={!formElement.valid} />
      );
    });

    return (
      <form onSubmit={orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>
    );
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    request: state.order.purchaseBurgerRequest,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = {
  purchaseBurger: actions.purchaseBurger
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
