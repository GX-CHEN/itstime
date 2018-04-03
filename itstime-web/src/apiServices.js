import axios from 'axios';

const baseURL = "http://chengongxia.com:3001"
// schedule part
export function findAllSchedules() {
  return axios.get(`${baseURL}/v1/allSchedules`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function findPersonalSchedules(id) {
  const personId = id.replace(/['"]+/g, '')
  return axios.get(`${baseURL}/v1/personalSchedules?id=${personId}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function findSingleSchedule(scheduleId) {
  scheduleId = scheduleId.replace(/['"]+/g, '')
  return axios.get(`${baseURL}/v1/schedule?id=${scheduleId}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function removeSchedule(scheduleId) {
  scheduleId = scheduleId.replace(/['"]+/g, '')
  return axios.get(`${baseURL}/v1/removeSchedule?id=${scheduleId}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function addSchedule(personId, name) {
  personId = personId.replace(/['"]+/g, '')
  return axios.get(`${baseURL}/v1/addSchedule?personId=${personId}&name=${name}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function removeScheduleItem(scheduleId, itemId) {
  scheduleId = scheduleId.replace(/['"]+/g, '');
  itemId = itemId.replace(/['"]+/g, '')
  return axios.get(`${baseURL}/v1/removeScheduleItem?scheduleId=${scheduleId}&itemId=${itemId}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function addScheduleItem(scheduleId, name, time, description) {
  scheduleId = scheduleId.replace(/['"]+/g, '')
  return axios.get(`${baseURL}/v1/addScheduleItem?scheduleId=${scheduleId}&name=${name}&time=${time}&description=${description}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function updateScheduleItem(scheduleId, itemId, name, time, description) {
  scheduleId = scheduleId.replace(/['"]+/g, '')
  return axios.get(`${baseURL}/v1/updateScheduleItem?scheduleId=${scheduleId}&itemId=${itemId}&name=${name}&time=${time}&description=${description}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

// credential part
export function singupService(username, password) {
  return axios.get(`${baseURL}/v1/signup?username=${username}&password=${password}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function loginService(username, password) {
  return axios.get(`${baseURL}/v1/login?username=${username}&password=${password}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}
