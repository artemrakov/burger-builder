import * as actions from '../actions/auth';
import reducer from './auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      request: 'none',
      error: null,
      token: null,
      userId: null,
      redirectPath: '/'
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  })


  it('should store the token upon login', () => {
    const state = reducer({}, { type: 'AUTH_SUCCESS', payload: { token: 'token', userId: '123' } })

    expect(state.token).toEqual('token');
    expect(state.userId).toEqual('123');
  })
});
