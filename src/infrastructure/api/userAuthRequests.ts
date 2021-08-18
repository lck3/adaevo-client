import axiosInstance, { getToken, setToken } from './axiosInstance'



export const login = async (form: {username: string, password: string}) => {
  const {data} = await axiosInstance.post(`/auth`, form)
  setToken(data.accessToken)
  return data
}

export const getUser = async () => {
  if (!getToken()) return null
  const {data} = await axiosInstance.get(`/auth`)
  return data
}