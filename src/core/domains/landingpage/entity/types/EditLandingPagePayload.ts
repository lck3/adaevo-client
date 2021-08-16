export type EditLandingPagePayload = {
  id: number,
  url?: string,
  status?: string,
  campaignId: number,
  stats?: {
    stats: {
      screenPageViews: number,
      engagementRate: number,
      sessions: number,
      engagedSessions: number,
    }
  },
}