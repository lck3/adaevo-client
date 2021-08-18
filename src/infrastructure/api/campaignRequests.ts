import { CreateCampaignPayload } from 'src/core/domains/campaign/entity/types/CreateCampaignPayload'
import { EditCampaignsPayload } from 'src/core/domains/campaign/entity/types/EditCampaignPayload'
import { ListCampaignsPayload } from 'src/core/domains/campaign/entity/types/ListCampaignPayload'
import axiosInstance from './axiosInstance'


export const addNewCampaignRequest = async (campaign: CreateCampaignPayload) => {
  const {data} = await axiosInstance.post('/campaigns', campaign)
  return data
}

export const getCampaignRequest = async () : Promise<ListCampaignsPayload[]> => {
  const {data} = await axiosInstance.get("/campaigns")
  return data
} 

export const getOneCampaignRequest = async (id: number) : Promise<EditCampaignsPayload> => {
  const {data} = await axiosInstance.get("/campaigns/" + id)
  return data
} 


export const updateCampaignRequest = async (id: number, campaign: EditCampaignsPayload) : Promise<EditCampaignsPayload> => {
  const {data} = await axiosInstance.patch("/campaigns/" + id, campaign)
  return data
} 
export const removeCampaignRequest = async (id: number) : Promise<EditCampaignsPayload> => {
  const {data} = await axiosInstance.delete("/campaigns/" + id)
  return data
} 