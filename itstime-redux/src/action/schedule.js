import { LIST_SCHEDULE, LIST_EVENTS, ADD_EVENT, UPDATE_EVENT, REMOVE_EVENT, ADD_SCHEDULE, REMOVE_SCHEDULE } from '../const/schedule';
import {
  listScheduleService,
  listEventService,
  addEventService,
  removeEventService,
  updateEventService,
  addScheduleService,
  removeScheduleService
} from '../model/apiService';

export const listSchedule = userId => {
  return dispatch => {
    dispatch({
      type: LIST_SCHEDULE,
      payload: listScheduleService(userId)
    });
  };
};

export const listEvent = scheduleId => {
  return dispatch => {
    dispatch({
      type: LIST_EVENTS,
      payload: listEventService(scheduleId)
    });
  };
};

export const addEvent = (scheduleId, name, time, description) => {
  return dispatch => {
    dispatch({
      type: ADD_EVENT,
      payload: addEventService(scheduleId, name, time, description)
    });
  };
};

export const updateEvent = (scheduleId, eventId, name, time, description) => {
  return dispatch => {
    dispatch({
      type: UPDATE_EVENT,
      payload: updateEventService(scheduleId, eventId, name, time, description)
    });
  };
};

export const removeEvent = (scheduleId, eventId) => {
  return dispatch => {
    dispatch({
      type: REMOVE_EVENT,
      payload: removeEventService(scheduleId, eventId)
    });
  };
};

export const createSchedule = (userId, name) => {
  return dispatch => {
    dispatch({
      type: ADD_SCHEDULE,
      payload: addScheduleService(userId, name)
    });
  };
};


export const deleteSchedule = (scheduleId) => {
  return dispatch => {
    dispatch({
      type: REMOVE_SCHEDULE,
      payload: removeScheduleService(scheduleId)
    });
  };
};
