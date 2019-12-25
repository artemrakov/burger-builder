import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
  const { fetchOrders, token, userId } = props;
  useEffect(() => {
    fetchOrders({ token: token, userId: userId });
  }, [fetchOrders, token, userId])

  const orders = () => {
    const request = props.request;

    if (request === 'requested') {
      return <Spinner />
    }

    if (request === 'failed') {
      return (
        <span>Please, reload the page!</span>
      );
    }

    return props.orders.map(order => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    ))
  }

  return (
    <div>
      {orders()}
    </div>
  );
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
