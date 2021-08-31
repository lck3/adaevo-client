import axiosInstance, { getToken, setRefreshToken, setToken } from './axiosInstance'
import { handleRemoteOperationError as handleError} from "../../ErrorHandler";



export const login = async (form: {username: string, password: string}) => {
  const response = await axiosInstance.post(`/auth`, form).catch(error => handleError(error))
  setToken(response?.data.accessToken)
  setRefreshToken(response?.data.refreshToken)
  return response?.data 
}

export const getUser = async () => {
  if (!getToken()) return null
  const response = await axiosInstance.get(`/auth`).catch(error => handleError(error))
  return response?.data }