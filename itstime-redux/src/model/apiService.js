import axios from 'axios';

// const baseURL = 'http://biteapie.com:3001';
const baseURL = 'http://itstime.mobi:3001';
// const baseURL = 'http://localhost:3001';
// schedule part
export function findPersonalSchedules(id) {
  const personId = id.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/personalSchedules?id=${personId}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function findSingleSchedule(scheduleId) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/schedule?id=${scheduleId}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function removeSchedule(scheduleId) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/removeSchedule?id=${scheduleId}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function addSchedule(personId, name) {
  personId = personId.replace(/['"]+/g, '');
  return axios.get(`${baseURL}/v1/addSchedule?personId=${personId}&name=${name}`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function removeScheduleItem(scheduleId, itemId) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  itemId = itemId.replace(/['"]+/g, '');
  const scheduleItem = { scheduleId, itemId };
  return axios.post(`${baseURL}/v1/removeScheduleItem`, scheduleItem).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function addScheduleItem(scheduleId, name, time, description) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  const scheduleItem = { scheduleId, name, time, description };
  return axios.post(`${baseURL}/v1/addScheduleItem`, scheduleItem).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function updateScheduleItem(scheduleId, itemId, name, time, description) {
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
