import React from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders({ token: this.props.token, userId: this.props.userId });
  }

  orders = () => {
    const request = this.props.request;

    if (request === 'requested') {
      return <Spinner />
    }

    if (request === 'failed') {
      return (
        <span>Please, reload the page!</span>
      );
    }

    return this.props.orders.map(order => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    ))
  }

  render() {
    return (
      <div>
        {this.orders()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    request: state.order.fetchOrdersRequest,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const actionsCreators = {
  fetchOrders: actions.fetchOrders
};

export default connect(mapStateToProps, actionsCreators)(withErrorHandler(Orders, axios));
