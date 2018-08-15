import reducers from '../../src/reducer/credential';
import { LOGIN_FULFILLED, LOGOUT_FULFILLED, REGISTER_FULFILLED } from '../../src/const/credential';

describe('credential reducer test', () => {
  it('reducers if action "LOGIN_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: LOGIN_FULFILLED,
        payload: {
          response: 'success'
        }
      }
    );
    expect(state).toEqual({
      payload: {
        response: 'success'
      },
      nextPage: 'scheduleList'
    });
  });

  it('reducers if action "REGISTER_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: REGISTER_FULFILLED,
        payload: {
          response: 'success'
        }
      }
    );
    expect(state).toEqual({
      payload: {
        response: 'success'
      },
      nextPage: 'login'
    });
  });

  it('reducers if action "LOGOUT_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: LOGOUT_FULFILLED,
        payload: {
          response: 'success'
        }
      }
    );
    expect(state).toEqual({});
  });
});
