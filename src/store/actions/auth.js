import { createAction } from 'redux-actions';
import axios from 'axios';

export const authRequest = createAction('AUTH_REQUEST');
export const authSuccess = createAction('AUTH_SUCCESS');
export const authFailed = createAction('AUTH_FAILED');

export const auth = (email, password) => async (dispatch) => {
  console.log('here')
  dispatch(authRequest());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };

  try {
    const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZFq3wKW5JGnTxwJJaacof3y7DqT7ORTI', authData);
    console.log(response);
    dispatch(authSuccess());
  } catch (e) {
    dispatch(authFailed())
  }
};
