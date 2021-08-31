import axiosInstance, { getToken, setRefreshToken, setToken } from './axiosInstance'
import axios from 'axios'

/**
 * @tutorial
 * Login to the Adaevo Platform using any of the two created accounts.
 * This method returns a Promise and does not handle Errors. It expects the calling function to 
 * handle errors which include possibly failed authentication attempts.
 * When the wrong username and password is submitted, a 401 HTTP status code
 * is returned from the server. This will cause any .catch methods on this 
 * Promise to be called. If no catch method is defined, an error will be thrown. 
 * A new axios instance is used to make this call to prevent interceptors attached
 * to the default `axiosInstance` being called.
 * @param form a valid username and password. Username's are valid emails
 */
export const login = async (form: {username: string, password: string}) => {
  const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/v1/auth`, form)
  setToken(response?.data.accessToken)
  setRefreshToken(response?.data.refreshToken)
  return response?.data 
}

/**
 * @tutorial
 * Get the currently logged in user's ID .
 * This request expects the Authorization header to 
 * have a valid Bearer Token value to be successful. 
 * This method returns a Promise and does not handle Errors. It expects the calling function to 
 * handle errors which include possibly failed user query attempts. Users consuming this method 
 * are expected to handle errors using a catch method.
 * An error will be thrown otherwise.
 */
export const getUser = async () => {
  if (!getToken()) return null
  const response = await axiosInstance.get(`/auth`)
  return response?.data }