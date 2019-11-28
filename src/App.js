import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import * as actions from './store/actions';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends React.Component {

  componentDidMount() {
    this.props.autoSignup();
  }

  routes = () => {
    const { isAuth } = this.props;

    if (isAuth) {
      return (
        <>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/logout" component={Logout} />
        </>
      );
    } else {
      return (
        <>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
        </>
      )
    }
  };

  render() {
    return (
      <div>
        <Layout>
          {this.routes()}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
};

const mapActionsToProps = {
  autoSignup: actions.authCheckState
};



export default connect(mapStateToProps, mapActionsToProps)(App);
