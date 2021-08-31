import axios from "axios"
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { handleRemoteOperationError as handleError} from "../../utils/ErrorHandler";



export function getToken() {
  return window.sessionStorage.getItem('adaevo_access_token') || null
}

export function setToken(token: string) {
  return window.sessionStorage.setItem('adaevo_access_token', `Bearer ${token}`)
}

export function getRefreshToken() {
  return window.localStorage.getItem('adaevo_refresh_token') || null
}

export function setRefreshToken(token: string) {
  return window.localStorage.setItem('adaevo_refresh_token', `${token}`)
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
  return response;
}, function (error) {

  if(error.status === 401) {
    window.localStorage.removeItem('adaevo_access_token')
    window.location.replace('/login')
  }
  return Promise.reject(error);
});

const refreshAuthLogic = (failedRequest: any) => axios.post(
  process.env.REACT_APP_API_SERVER + '/api/v1/auth/refresh',
  {
    refresh_token: getRefreshToken()
  }
).then(tokenRefreshResponse => {
    
    setToken(tokenRefreshResponse.data.accessToken)
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + getToken();
    return Promise.resolve();
})
.catch(error => {
  handleError(error.response.data)

})
// Create an interceptor to handle refreshing the access token when it expires
createAuthRefreshInterceptor(instance, refreshAuthLogic);


export default instance