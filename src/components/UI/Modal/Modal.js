import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const modal = (props) => {
  const styles = {
    transfrom: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0'
  }

  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={styles}>
        {props.children}
      </div>
    </>
  )
};

export default modal;
