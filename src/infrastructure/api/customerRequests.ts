import { CreateCustomerPayload } from 'src/core/domains/customer/entity/types/CreateCustomerPayload'
import { CustomerPayload } from 'src/core/domains/customer/entity/types/CustomerPayload'
import { EditCustomerPayload } from 'src/core/domains/customer/entity/types/EditCustomerPayload'
import axiosInstance from './axiosInstance'


export const addNewCustomerRequest = async (customer: CreateCustomerPayload) => {
  const {data} = await axiosInstance.post('/customers', customer)
  return data
}

export const getCustomerRequest = async () : Promise<CustomerPayload[]> => {
  const {data} = await axiosInstance.get("/customers")
  return data
} 

export const getOneCustomerRequest = async (id: number) : Promise<CustomerPayload> => {
  const {data} = await axiosInstance.get("/customers/" + id)
  return data
} 

export const editCustomerRequest = async (id: number, customer: EditCustomerPayload) : Promise<CustomerPayload> => {
  const {data} = await axiosInstance.patch("/customers/" + id, customer)
  return data
} 
export const removeCustomerRequest = async (id: number) : Promise<CustomerPayload> => {
  const {data} = await axiosInstance.delete("/customers/" + id)
  return data
} 

