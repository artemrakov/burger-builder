import { createAction } from 'redux-actions';
import axios from 'axios';

export const authRequest = createAction('AUTH_REQUEST');
export const authSuccess = createAction('AUTH_SUCCESS');
export const authFailed = createAction('AUTH_FAILED');
export const authLogout = createAction('AUTH_LOGOUT', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
});
export const authRedirect = createAction('AUTH_REDIRECT');

export const auth = (email, password, isSignup) => async (dispatch) => {
  dispatch(authRequest());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };

  try {
    const url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    const response = await axios.post(url + process.env.FIREBASE_API, authData);
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    dispatch(authSuccess({ token: response.data.idToken, userId: response.data.localId }));
    dispatch(checkAuthTimeout(response.data.expiresIn));
  } catch (e) {
    dispatch(authFailed({ error: e.response.data.error }));
  }
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  const userId = localStorage.getItem('userId');

  if (!token) {
    dispatch(authLogout());
    return;
  }

  if (expirationDate < new Date()) {
    dispatch(authLogout());
    return;
  }

  dispatch(authSuccess({ token, userId }));
  const milesecondsLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;
  dispatch(checkAuthTimeout(milesecondsLeft));
};
