import {
  LIST_SCHEDULE,
  LIST_EVENTS,
  ADD_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT
} from '../const/schedule';
import {
  findPersonalSchedules,
  findSingleSchedule,
  addScheduleItem,
  removeScheduleItem,
  updateScheduleItem
} from '../model/apiService';

export const listSchedule = userId => {
  return dispatch => {
    dispatch({
      type: LIST_SCHEDULE,
      payload: findPersonalSchedules(userId)
    });
  };
};

export const getSingleSchedule = scheduleId => {
  return dispatch => {
    dispatch({
      type: LIST_EVENTS,
      payload: findSingleSchedule(scheduleId)
    });
  };
};

export const addEvent = (scheduleId, name, time, description) => {
  return dispatch => {
    dispatch({
      type: ADD_EVENT,
      payload: addScheduleItem(scheduleId, name, time, description)
    });
  };
};

export const updateEvent = (scheduleId, eventId, name, time, description) => {
  return dispatch => {
    dispatch({
      type: UPDATE_EVENT,
      payload: updateScheduleItem(scheduleId, eventId, name, time, description)
    });
  };
};

export const removeEvent = (scheduleId, eventId) => {
  return dispatch => {
    dispatch({
      type: REMOVE_EVENT,
      payload: removeScheduleItem(scheduleId, eventId)
    });
  };
};
