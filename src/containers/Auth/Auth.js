import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { checkValidity } from '../../shared/utility';

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const [isSignup, setIsSignup] = useState(true);
  const {buildingBurger, redirectPath, setAuthRedirect} = props;

  useEffect(() => {
    if (!buildingBurger && redirectPath !== '/') {
      setAuthRedirect({ path: '/' });
    }
  }, [buildingBurger, redirectPath, setAuthRedirect]);

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { auth } = props;
    const email = controls.email.value;
    const password = controls.password.value;

    auth({ email, password, isSignup });
  };

  const inputChangedHandler = (id) => (event) => {
    const updatedControls = { ...controls };
    const updatedFormElement = { ...updatedControls[id] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedControls[id] = updatedFormElement;

    setControls(updatedControls);
  };

  const form = () => {
    const { request, error } = props;

    if (request === 'requested') {
      return <Spinner />
    }

    const formElements = Object.keys(controls).map((key) => {
      const formElement = controls[key];
      return (
        <Input
          key={key}
          changed={inputChangedHandler(key)}
          elementType={formElement.elementType}
          elementConfig={formElement.elementConfig}
          value={formElement.value}
          touched={formElement.touched}
          shouldValidate={formElement.validation}
          invalid={!formElement.valid} />
      );
    });

    return (
      <>
        { error && <p>{ error.message }</p> }
        <form onSubmit={submitHandler}>
          {formElements}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={switchAuthModeHandler}
          btnType="Danger">
          SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP' }
        </Button>
      </>
    );
  }

  return (
    <div className={classes.Auth}>
      {props.isAuth && <Redirect to={props.redirectPath} />}
      {form()}
    </div>
  );
}

const mapActionsToProps = {
  auth: actions.auth,
  setAuthRedirect: actions.authRedirect
};


const mapStateToProps = (state) => {
  return {
    request: state.auth.request,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    redirectPath: state.auth.redirectPath,
    buildingBurger: state.burgerBuilder.building
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Auth);
