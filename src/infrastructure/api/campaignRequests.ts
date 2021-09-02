/** 
 * The services /axios requests defined here return back a Promise without 
 * any error handling . This passes the responsibility of catching errors 
 * to the calling function. 
 * If errors are not caught, errors will likely crash the app and get caught 
 * the default error boundary
 */
import { CreateCampaignArguments, CreateCampaignPayload } from 'src/core/domains/campaign/entity/types/CreateCampaignPayload'
import { EditCampaignArguments, EditCampaignsPayload } from 'src/core/domains/campaign/entity/types/EditCampaignPayload'
import { ListCampaignsPayload } from 'src/core/domains/campaign/entity/types/ListCampaignPayload'
import axiosInstance from './axiosInstance'


export const addNewCampaignRequest = async (campaign: CreateCampaignArguments): Promise<CreateCampaignPayload> => {
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


export const updateCampaignRequest = async ({campaignId, campaignData} : EditCampaignArguments ) : Promise<EditCampaignsPayload> => {
  const {data} = await axiosInstance.patch("/campaigns/" + campaignId, campaignData)
  return data
} 
export const removeCampaignRequest = async (id: number) : Promise<EditCampaignsPayload> => {
  const {data} = await axiosInstance.delete("/campaigns/" + id)
  return data
} 