import axios from "axios"

export function getToken() {
  return window.localStorage.getItem('adaevo_access_token') || null
}

export function setToken(token: string) {
  return window.localStorage.setItem('adaevo_access_token', `Bearer ${token}`)
}

const instance  = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER + '/api/v1'
});

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {
    ...config.headers,
    'Authorization' : getToken()
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.status === 401) {
    window.localStorage.removeItem('adaevo_access_token')
    window.location.replace('/login')
  }
  return Promise.reject(error);
});

export default instance