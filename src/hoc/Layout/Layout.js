import React from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));
  }

  render() {
    return (
      <>
        <Toolbar isAuth={this.props.isAuth} toggleSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer closed={this.sideDrawerClosedHandler} show={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
