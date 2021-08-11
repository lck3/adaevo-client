import { CreateCustomerPayload } from 'src/core/domains/customer/entity/CreateCustomerPayload'
import { CustomerPayload } from 'src/core/domains/customer/entity/CustomerPayload'
import axiosInstance from './index'


export const addNewCustomerRequest = async (customer: CreateCustomerPayload) => {
  const {data} = await axiosInstance.post('/customers', customer)
  return data
}

export const getCustomerRequest = async () : Promise<CustomerPayload[]> => {
  const {data} = await axiosInstance.get("/customers")
  return data
} 