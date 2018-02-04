import axios from 'axios';


export function findAllSchedules() {
  return axios.get("http://chengongxia.com:3000/v1/schedules.json").then(function (res) {
    if (res.status != 200)
      throw new Error("bad response from server" + res.status)
    return res.data
  })
}