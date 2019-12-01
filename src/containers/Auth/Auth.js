import React from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { checkValidity } from '../../shared/utility';

class Auth extends React.Component {
  state = {
    controls: {
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
    },
    isSignup: true
  }

  componentDidMount() {
    const { buildingBurger, redirectPath, setAuthRedirect } = this.props;

    if (!buildingBurger && redirectPath !== '/') {
      setAuthRedirect({ path: '/' });
    }
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    })
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { auth } = this.props;
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;

    auth(email, password, this.state.isSignup);
  };

  inputChangedHandler = (id) => (event) => {
    const updatedControls = { ...this.state.controls };
    const updatedFormElement = { ...updatedControls[id] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedControls[id] = updatedFormElement;

    this.setState({ controls: updatedControls });
  };

  form = () => {
    const { request, error } = this.props;

    if (request === 'requested') {
      return <Spinner />
    }

    const formElements = Object.keys(this.state.controls).map((key) => {
      const formElement = this.state.controls[key];
      return (
        <Input
          key={key}
          changed={this.inputChangedHandler(key)}
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
        <form onSubmit={this.submitHandler}>
          {formElements}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }
        </Button>
      </>
    );
  }

  render() {
    return (
      <div className={classes.Auth}>
        {this.props.isAuth && <Redirect to={this.props.redirectPath} />}
        {this.form()}
      </div>
    );
  }
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
