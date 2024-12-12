import axios, { type AxiosInstance, type AxiosRequestHeaders } from 'axios'
import { storageHandler } from './localStorage'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.request.use(async (config) => {
  const token = storageHandler.getToken()
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    } as AxiosRequestHeaders
  }

  return config
})

export default axiosInstance
