import { createAction } from 'redux-actions';
import axios from 'axios';

export const authRequest = createAction('AUTH_REQUEST');
export const authSuccess = createAction('AUTH_SUCCESS');
export const authFailed = createAction('AUTH_FAILED');
export const authLogout = createAction('AUTH_LOGOUT');

export const auth = (email, password, isSignup) => async (dispatch) => {
  dispatch(authRequest());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  const apiKey = 'AIzaSyBZFq3wKW5JGnTxwJJaacof3y7DqT7ORTI';

  try {
    if (isSignup) {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey, authData);
      dispatch(authSuccess({ token: response.data.idToken, userId: response.data.localId }));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } else {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey, authData);
      dispatch(authSuccess({ token: response.data.idToken, userId: response.data.localId }));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    }
  } catch (e) {
    dispatch(authFailed({ error: e.response.data.error }));
  }
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};
