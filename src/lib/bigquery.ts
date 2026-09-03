// Helper utility for streaming analytics events into Google BigQuery
// Used for B2B analytics (e.g. tracking impressions and nearby deal foot-traffic)

export type DealImpressionEvent = {
  dealId: string
  companyName: string
  userId: string
  userLatitude: number
  userLongitude: number
  distanceMeters: number
  timestamp: string
}

export async function logDealImpressionToBigQuery(event: DealImpressionEvent) {
  // In production with GCP, @google-cloud/bigquery SDK streams this event:
  // const bigquery = new BigQuery();
  // await bigquery.dataset('b2b_analytics').table('deal_impressions').insert([event]);

  if (process.env.NODE_ENV === "development") {
    console.log("[BigQuery Event Streamed]:", event)
  }
}
