import { CreateCampaignPayload } from 'src/core/domains/campaign/entity/types/CreateCampaignPayload'
import { ListCampaignsPayload } from 'src/core/domains/campaign/entity/types/ListCampaignPayload'
import axiosInstance from './index'


export const addNewCampaignRequest = async (campaign: CreateCampaignPayload) => {
  const {data} = await axiosInstance.post('/campaigns', campaign)
  return data
}

export const getCampaignRequest = async () : Promise<ListCampaignsPayload[]> => {
  const {data} = await axiosInstance.get("/campaigns")
  return data
} 