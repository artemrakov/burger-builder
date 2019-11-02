import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    const styles = {
      transfrom: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
    }

    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={styles}>
          {this.props.children}
        </div>
      </>
    );
  }
};

export default Modal;
