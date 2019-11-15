import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: 1,
      customer: {
        name: 'Artem Rakov',
        address: {
          street: 'Test',
          zipCode: '312123',
          country: 'Canada'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    const response = await axios.post('/orders.json', order);
    console.log(response);
    this.setState({ loading: false });
    this.props.history.push('/');
  }

  form = () => {
    const loading = this.state.loading;

    if (loading) {
      return <Spinner />
    } else {
      return (
        <form>
          <input className={classes.Input} type='text' name='name' placeholder="Your name" />
          <input className={classes.Input} type='email' name='email' placeholder="Your email" />
          <input className={classes.Input} type='text' name='street' placeholder="Your Street" />
          <input className={classes.Input} type='text' name='postal' placeholder="Postal Code" />
          <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
        </form>
      );
    }
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

export default withRouter(ContactData);
