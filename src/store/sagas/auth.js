import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions';

export function* authLogoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
};

export function* checkAuthTimeoutSaga({ payload: { expirationTime }}) {
  yield delay(expirationTime);
  yield put(actions.authLogout);
}
