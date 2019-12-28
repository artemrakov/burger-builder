import { createAction } from 'redux-actions';

export const authRequest = createAction('AUTH_REQUEST');
export const authSuccess = createAction('AUTH_SUCCESS');
export const authFailed = createAction('AUTH_FAILED');
export const authLogout = createAction('AUTH_LOGOUT');
export const authRedirect = createAction('AUTH_REDIRECT');
export const checkAuthTimeout = createAction('AUTH_CHECK_TIMEOUT');
export const auth = createAction('AUTH_USER');
export const authCheckState = createAction('AUTH_CHECK_STATE');
