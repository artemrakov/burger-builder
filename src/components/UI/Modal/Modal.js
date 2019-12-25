import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = props => {
  const styles = {
    transfrom: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    display: props.show ? 'block' : 'none'
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
  );
};

export default React.memo(Modal, (prevProps, nextProps) =>
  nextProps.show === prevProps.show &&
  nextProps.children === prevProps.children
);
