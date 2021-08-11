import { CreateCampaignPayload } from 'src/core/domains/campaign/entity/types/CreateCampaignPayload'
import axiosInstance from './index'


export const addNewCampaignRequest = async (campaign: CreateCampaignPayload) => {
  const {data} = await axiosInstance.post('/campaigns', campaign)
  return data
}

// export const getCustomerRequest = async () : Promise<CustomerPayload[]> => {
//   const {data} = await axiosInstance.get("/customers")
//   return data
// } 