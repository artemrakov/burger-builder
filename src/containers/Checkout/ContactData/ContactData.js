import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import * as actions from '../../../store/actions';

class ContactData extends React.Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = async (e) => {
    e.preventDefault();
    const formData = Object.keys(this.state.orderForm).reduce((acc, key) => {
      return { ...acc, [key]: this.state.orderForm[key].value }
    }, {});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    this.props.purchaseBurger(order);
    this.props.history.push('/');
  }

  inputChangedHandler = (id) => (e) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[id] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[id] = updatedFormElement;

    const formIsValid = this.checkValidationOfTheForm(updatedOrderForm);

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  checkValidationOfTheForm = (form) => {
    const validity = Object.keys(form).map(key => form[key].valid);
    return validity.every(e => e === true)
  };

  form = () => {
    const request = this.props.request;

    if (request === 'requested') {
      return <Spinner />
    }

    if (request === 'failed') {
      return (
        <span>Please, reload the page!</span>
      );
    }

    const formElements = Object.keys(this.state.orderForm).map((key) => {
      const formElement = this.state.orderForm[key];
      return (
        <Input
          key={key}
          changed={this.inputChangedHandler(key)}
          elementType={formElement.elementType}
          elementConfig={formElement.elementConfig}
          value={formElement.value}
          touched={formElement.touched}
          shouldValidate={formElement.validation}
          invalid={!formElement.valid} />
      );
    });

    return (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.form()}
     </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    request: state.order.purchaseBurgerRequest
  }
};

const mapDispatchToProps = {
  purchaseBurger: actions.purchaseBurger
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
