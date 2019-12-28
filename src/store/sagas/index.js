import { takeEvery } from 'redux-saga/effects';

import * as actions from '../actions';
import { authLogoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actions.authLogout, authLogoutSaga);
}
