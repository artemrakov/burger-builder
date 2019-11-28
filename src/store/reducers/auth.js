import * as actions from '../actions/auth';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const redirectPath = handleActions({
  [actions.authRedirect](state, { payload: { path } }) {
    return path;
  }
}, '/');

const token = handleActions({
  [actions.authSuccess](state, { payload: { token } }) {
    return token;
  },
  [actions.authLogout]() {
    return null;
  }
}, null);

const userId = handleActions({
  [actions.authSuccess](state, { payload: { userId } }) {
    return userId;
  },
  [actions.authLogout]() {
    return null;
  }
}, null);

const error = handleActions({
  [actions.authSuccess]() {
    return null;
  },
  [actions.authFailed](state, { payload: { error } }) {
    return error;
  }
}, null);

const request  = handleActions({
  [actions.authRequest]() {
    return 'requested';
  },
  [actions.authSuccess]() {
    return 'complete';
  },
  [actions.authFailed]() {
    return 'failed';
  }
}, 'none');


export default combineReducers({
  request,
  error,
  token,
  userId,
  redirectPath
})
