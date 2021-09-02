import { EditLandingPagePayload } from "src/core/domains/landingpage/entity/types/EditLandingPagePayload";

export type EditCampaignsPayload = {
  title: string,
  tags: string[],
  customer: {
    businessName: string
  },
  landingPages: EditLandingPagePayload[]
}

export type EditCampaignArguments = {
  campaignId: number,
  campaignData: {
    title: string,
    tags: string
  }
}