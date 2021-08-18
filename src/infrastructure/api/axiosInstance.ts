import axios from "axios"

export function getToken() {
  return window.localStorage.getItem('adaevo_access_token')
}

export function setToken(token: string) {
  return window.localStorage.setItem('adaevo_access_token', `Bearer ${token}`)
}
export default axios.create({
  baseURL: process.env.REACT_APP_API_SERVER + '/api/v1',
  headers: {
    'Authorization' : getToken()
  }
});