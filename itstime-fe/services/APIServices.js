import axios from 'axios';


export function findAllSchedules() {
  return axios.get("http://chengongxia.com:3000/v1/allSchedules").then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function findPersonalSchedules(id) {
  const personId = id.replace(/['"]+/g, '')
  return axios.get(`http://chengongxia.com:3000/v1/personalSchedules?id=${personId}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function findSingleSchedule(id) {
  const scheduleId = id.replace(/['"]+/g, '')
  return axios.get(`http://chengongxia.com:3000/v1/schedule?id=${scheduleId}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function singupService(username, password) {
  return axios.get(`http://chengongxia.com:3000/v1/signup?username=${username}&password=${password}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}

export function loginService(username, password) {
  return axios.get(`http://chengongxia.com:3000/v1/login?username=${username}&password=${password}`).then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}