import React from 'react';
import cn from 'classnames';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';


const sideDrawer = (props) => {
  const sideDrawerClasses = cn({
    [classes.SideDrawer]: true,
    [classes.Open]: props.show,
    [classes.Close]: !props.show
  });

  return (
    <>
      <Backdrop clicked={props.closed} show={props.show} />
      <div className={sideDrawerClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
