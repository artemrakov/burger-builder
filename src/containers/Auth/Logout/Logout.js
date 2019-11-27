import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';

class Logout extends React.Component {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  render() {
    return <Redirect to='/' />
  };
}

const mapActionsToProps = {
  logout: actions.authLogout
};

export default connect(null, mapActionsToProps)(Logout);
