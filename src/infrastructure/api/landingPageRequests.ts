import { AddLandingPagePayload } from 'src/core/domains/landingpage/entity/types/AddLandingPagePayload'
import { EditLandingPagePayload } from 'src/core/domains/landingpage/entity/types/EditLandingPagePayload'
import LandingPage from 'src/core/domains/landingpage/LandingPage'
import axiosInstance from './axiosInstance'


export const addNewLandingPageRequest = async (campaign: AddLandingPagePayload) : Promise<LandingPage>=> {
  const {data} = await axiosInstance.post(`/campaigns/${campaign.campaignId}/landing-pages`, {url: campaign.url})
  return data
}

export const updateLandingPageStatusRequest = async (id: number, campaign: EditLandingPagePayload) : Promise<LandingPage> => {
  const {data} = await axiosInstance.patch(`/campaigns/${campaign.campaignId}/landing-pages/${id}`, {status: campaign.status})

  return data
} 
export const removeLandingPageRequest = async (campaignId: number, id: number) : Promise<LandingPage> => {
  const {data} = await axiosInstance.delete(`/campaigns/${campaignId}/landing-pages/${id}`)
  return data
} 