import { takeEvery, all } from 'redux-saga/effects';

import * as actions from '../actions';
import { authLogoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';

export function* watchAuth() {
  yield all([
    takeEvery(actions.authLogout, authLogoutSaga),
    takeEvery(actions.checkAuthTimeout, checkAuthTimeoutSaga),
    takeEvery(actions.auth, authSaga),
    takeEvery(actions.authCheckState, authCheckStateSaga)
  ])
}

