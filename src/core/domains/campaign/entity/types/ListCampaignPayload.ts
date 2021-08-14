export type ListCampaignsPayload = {
  id: number,
  title: string,
  tags: string[],
  _count: {
    leads: number
  }
}