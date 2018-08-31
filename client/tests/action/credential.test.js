import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import applicationReducer from '../../src/rootReducer';
import { register, login, logout } from '../../src/action/credential';
import { LOGIN_FULFILLED, LOGOUT_FULFILLED, REGISTER_FULFILLED } from '../../src/const/credential';

let middleware = [thunk, promiseMiddleware()];
let glob = typeof window !== 'undefined' ? window : global;
const devToolsExtension = glob.devToolsExtension;

let store;
let mock = new MockAdapter(axios);

const initialArrange = () => {
  jest.resetAllMocks();
  mock.reset();
  store = createStore(
    applicationReducer,
    compose(
      applyMiddleware(...middleware),
      devToolsExtension ? devToolsExtension() : f => f
    )
  );
};

const mockRes = { result: 'success' };

describe('action tests for credential (register/login/logout)', () => {
  beforeEach(initialArrange);

  it('test register FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(register());
    expect(result.action.type).toEqual(REGISTER_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });

  it('test login FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(login());
    expect(result.action.type).toEqual(LOGIN_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });

  it('test logout FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(logout());
    expect(result.action.type).toEqual(LOGOUT_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });
});
