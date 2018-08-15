import reducers from '../../src/reducer/schedule';
import {
  LIST_SCHEDULE_FULFILLED,
  ADD_SCHEDULE_FULFILLED,
  REMOVE_SCHEDULE_FULFILLED,
  LIST_EVENT_FULFILLED,
  ADD_EVENT_FULFILLED,
  UPDATE_EVENT_FULFILLED,
  REMOVE_EVENT_FULFILLED
} from '../../src/const/schedule';

describe('schedule reducer test', () => {
  it('reducers if action "LIST_SCHEDULE_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: LIST_SCHEDULE_FULFILLED,
        payload: {
          scheduleList: []
        }
      }
    );
    expect(state).toEqual({
      payload: {
        scheduleList: []
      },
      actionStatus: 'list_schedule_succeed'
    });
  });

  it('reducers if action "ADD_SCHEDULE_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: ADD_SCHEDULE_FULFILLED,
        payload: {
          scheduleList: []
        }
      }
    );
    expect(state).toEqual({
      payload: {
        scheduleList: []
      },
      actionStatus: 'add_schedule_succeed',
      nextPage: 'scheduleList'
    });
  });

  it('reducers if action "REMOVE_SCHEDULE_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: REMOVE_SCHEDULE_FULFILLED,
        payload: {
          scheduleList: []
        }
      }
    );
    expect(state).toEqual({
      payload: {
        scheduleList: []
      },
      actionStatus: 'remove_schedule_succeed',
      nextPage: 'scheduleList'
    });
  });
});

describe('event reducer test', () => {
  it('reducers if action "LIST_EVENT_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: LIST_EVENT_FULFILLED,
        payload: {
          eventList: []
        }
      }
    );
    expect(state).toEqual({
      payload: {
        eventList: []
      }
    });
  });

  it('reducers if action "ADD_EVENT_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: ADD_EVENT_FULFILLED,
        payload: {
          eventList: []
        }
      }
    );
    expect(state).toEqual({
      payload: {
        eventList: []
      },
      actionStatus: 'add_event_succeed',
      nextPage: 'calendarEvents'
    });
  });

  it('reducers if action "REMOVE_EVENT_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: REMOVE_EVENT_FULFILLED,
        payload: {
          eventList: []
        }
      }
    );
    expect(state).toEqual({
      payload: {
        eventList: []
      },
      actionStatus: 'delete_event_succeed',
      nextPage: 'calendarEvents'
    });
  });

  it('reducers if action "UPDATE_EVENT_FULFILLED"', () => {
    let state;
    state = reducers(
      {},
      {
        type: UPDATE_EVENT_FULFILLED,
        payload: {
          eventList: []
        }
      }
    );
    expect(state).toEqual({
      payload: {
        eventList: []
      },
      actionStatus: 'update_event_succeed',
      nextPage: 'calendarEvents'
    });
  });
});
