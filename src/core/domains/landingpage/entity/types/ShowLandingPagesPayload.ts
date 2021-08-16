export type ShowLandingPagesPayload = {
  id: number,
  url: string,
  status: string,
  stats?: {
    screenPageViews: number,
    engagementRate: number,
    sessions: number,
    engagedSessions: number,
  },
  createdAt: Date,
  updatedAt: Date
}