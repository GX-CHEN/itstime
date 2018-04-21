import axios from 'axios';

// const baseURL = 'https://biteapie.com';
const baseURL = 'https://itstime.mobi';
// const baseURL = 'http://localhost:3001';
// schedule part
export function listScheduleService(id) {
  const personId = id.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/personalSchedules?id=${personId}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function listEventService(scheduleId) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/schedule?id=${scheduleId}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function removeScheduleService(scheduleId) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/removeSchedule?id=${scheduleId}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function addScheduleService(personId, name) {
  personId = personId.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/addSchedule?personId=${personId}&name=${name}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function removeEventService(scheduleId, itemId) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  itemId = itemId.replace(/['"]+/g, '');
  const scheduleItem = { scheduleId, itemId };
  return axios.post(`${baseURL}/v1/removeScheduleItem`, scheduleItem).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function addEventService(scheduleId, name, time, description) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  const scheduleItem = { scheduleId, name, time, description };
  return axios.post(`${baseURL}/v1/addScheduleItem`, scheduleItem).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function updateEventService(scheduleId, itemId, name, time, description) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  const scheduleItem = {
    scheduleId,
    itemId,
    name,
    time,
    description
  };
  return axios.post(`${baseURL}/v1/updateScheduleItem`, scheduleItem).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

// credential part
export function registerService(username, password) {
  const user = {
    username,
    password
  };
  return axios.post(`${baseURL}/v1/signup`, user).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function loginService(username, password) {
  const user = {
    username,
    password
  };
  return axios.post(`${baseURL}/v1/login`, user).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}
