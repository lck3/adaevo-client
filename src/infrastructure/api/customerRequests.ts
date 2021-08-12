import { CreateCustomerPayload } from 'src/core/domains/customer/entity/types/CreateCustomerPayload'
import { CustomerPayload } from 'src/core/domains/customer/entity/types/CustomerPayload'
import axiosInstance from './index'


export const addNewCustomerRequest = async (customer: CreateCustomerPayload) => {
  const {data} = await axiosInstance.post('/customers', customer)
  return data
}

export const getCustomerRequest = async () : Promise<CustomerPayload[]> => {
  const {data} = await axiosInstance.get("/customers")
  return data
} 

export const removeCustomerRequest = async (id: number) : Promise<CustomerPayload[]> => {
  const {data} = await axiosInstance.delete("/customers/" + id)
  return data
} 

