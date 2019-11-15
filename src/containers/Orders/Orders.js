import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }

  async componentDidMount() {
    const response = await axios.get('/orders.json');
    const orders = Object.keys(response.data).map((key) => {
      return { id: key, ...response.data[key] }
    });

    this.setState({ loading: false, orders })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
