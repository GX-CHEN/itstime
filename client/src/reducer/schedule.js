import {
  LIST_SCHEDULE_FULFILLED,
  LIST_EVENT_FULFILLED,
  ADD_EVENT_FULFILLED,
  UPDATE_EVENT_FULFILLED,
  REMOVE_EVENT_FULFILLED,
  ADD_SCHEDULE_FULFILLED,
  REMOVE_SCHEDULE_FULFILLED
} from '../const/schedule';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_SCHEDULE_FULFILLED: {
      return {
        ...state,
        payload,
        actionStatus: 'list_schedule_succeed'
      };
    }
    case ADD_SCHEDULE_FULFILLED: {
      return {
        ...state,
        payload,
        actionStatus: 'add_schedule_succeed',
        nextPage: 'scheduleList'
      };
    }
    case REMOVE_SCHEDULE_FULFILLED: {
      return {
        ...state,
        payload,
        actionStatus: 'remove_schedule_succeed',
        nextPage: 'scheduleList'
      };
    }
    case LIST_EVENT_FULFILLED: {
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
