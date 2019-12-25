import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  return (
    <>
      <Toolbar isAuth={props.isAuth} toggleSideDrawer={sideDrawerToggleHandler} />
      <SideDrawer closed={sideDrawerClosedHandler} show={showSideDrawer} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
