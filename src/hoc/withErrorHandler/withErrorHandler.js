import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  }
}


export default withErrorHandler;
