export type CreateCampaignPayload = {
  id: number,
  title: string,
  tags: string[],
  customerId: string
}
export type CreateCampaignArguments = {
  title: string,
  tags: string[],
  customerId: string
}