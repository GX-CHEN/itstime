import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import applicationReducer from '../../src/rootReducer';
import {
  listSchedule,
  createSchedule,
  deleteSchedule,
  listEvent,
  addEvent,
  updateEvent,
  removeEvent
} from '../../src/action/schedule';
import {
  LIST_SCHEDULE_FULFILLED,
  ADD_SCHEDULE_FULFILLED,
  REMOVE_SCHEDULE_FULFILLED,
  LIST_EVENT_FULFILLED,
  ADD_EVENT_FULFILLED,
  UPDATE_EVENT_FULFILLED,
  REMOVE_EVENT_FULFILLED
} from '../../src/const/schedule';

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

describe('schedule level test', () => {
  beforeEach(initialArrange);

  it('test listSchedule FULFILLED action with promise middleware', async () => {
    mock.onGet().reply(200, mockRes);
    const result = await store.dispatch(listSchedule());
    expect(result.action.type).toEqual(LIST_SCHEDULE_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });

  it('test createSchedule FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(createSchedule());
    expect(result.action.type).toEqual(ADD_SCHEDULE_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });

  it('test deleteSchedule FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(deleteSchedule());
    expect(result.action.type).toEqual(REMOVE_SCHEDULE_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });
});

describe('event level test', () => {
  beforeEach(initialArrange);

  it('test listEvent FULFILLED action with promise middleware', async () => {
    mock.onGet().reply(200, mockRes);
    const result = await store.dispatch(listEvent());
    expect(result.action.type).toEqual(LIST_EVENT_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });

  it('test addEvent FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(addEvent());
    expect(result.action.type).toEqual(ADD_EVENT_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });

  it('test updateEvent FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(updateEvent());
    expect(result.action.type).toEqual(UPDATE_EVENT_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });

  it('test removeEvent FULFILLED action with promise middleware', async () => {
    mock.onPost().reply(200, mockRes);
    const result = await store.dispatch(removeEvent());
    expect(result.action.type).toEqual(REMOVE_EVENT_FULFILLED);
    expect(result.action.payload).toEqual(mockRes);
  });
});
