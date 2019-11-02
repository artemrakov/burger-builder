import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
        <Toolbar toggleSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer closed={this.sideDrawerClosedHandler} show={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default Layout;
