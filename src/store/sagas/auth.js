import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* authLogoutSaga(action) {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
};

export function* checkAuthTimeoutSaga({ payload: { expirationTime }}) {
  yield delay(expirationTime);
  yield put(actions.authLogout());
}

export function* authSaga({ payload: { email, password, isSignup }}) {
  yield put(actions.authRequest());
  const authData = {
    email,
    password,
    returnSecureToken: true
  }
  try {
    const url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    const response = yield axios.post(url + process.env.FIREBASE_API, authData);
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess({ token: response.data.idToken, userId: response.data.localId }));
    yield put(actions.checkAuthTimeout({ expirationTime: response.data.expiresIn * 1000 }));
  } catch (e) {
    yield put(actions.authFailed({ error: e.response.data.error }));
  }
}

export function* authCheckStateSaga() {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  const userId = localStorage.getItem('userId');

  if (!token) {
    yield put(actions.authLogout());
    return;
  }

  if (expirationDate < new Date()) {
    yield put(actions.authLogout());
    return;
  }

  yield put(actions.authSuccess({ token, userId }));
  const milesecondsLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;
  yield put(actions.checkAuthTimeout({ expirationTime: milesecondsLeft * 1000 }))
}
