import {
  LIST_SCHEDULE_FULFILLED,
  LIST_EVENTS_FULFILLED,
  ADD_EVENT_FULFILLED,
  UPDATE_EVENT_FULFILLED,
  REMOVE_EVENT_FULFILLED
} from '../const/schedule';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_SCHEDULE_FULFILLED: {
      return {
        ...state,
        payload
      };
    }
    case LIST_EVENTS_FULFILLED: {
      return {
        ...state,
        payload
      };
    }
    case ADD_EVENT_FULFILLED: {
      return {
        ...state,
        payload,
        actionStatus: 'add_event_succeed',
        nextPage: 'calendarEvents'
      };
    }
    case UPDATE_EVENT_FULFILLED: {
      return {
        ...state,
        payload,
        actionStatus: 'update_event_succeed',
        nextPage: 'calendarEvents'
      };
    }
    case REMOVE_EVENT_FULFILLED: {
      return {
        ...state,
        payload,
        actionStatus: 'delete_event_succeed',
        nextPage: 'calendarEvents'
      };
    }
    default:
      return state;
  }
};