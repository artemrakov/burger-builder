import { takeEvery } from 'redux-saga/effects';

import * as actions from '../actions';
import { authLogoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actions.authLogout, authLogoutSaga);
  yield takeEvery(actions.checkAuthTimeout, checkAuthTimeoutSaga);
  yield takeEvery(actions.auth, authSaga);
  yield takeEvery(actions.authCheckState, authCheckStateSaga);
}

