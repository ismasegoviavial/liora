import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { logDealImpressionToBigQuery } from "@/lib/bigquery"

// Haversine formula to calculate distance between two lat/lng points in meters
function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth's radius in meters
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const dp = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dp / 2) * Math.sin(dp / 2) +
    Math.cos(p1) * Math.cos(p2) *
    Math.sin(dl / 2) * Math.sin(dl / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export async function POST(req: Request) {
  try {
    const { latitude, longitude, userId = "dummy-user-123" } = await req.json()

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Missing coordinates" }, { status: 400 })
    }

    // 1. Fetch active and non-expired deals
    const now = new Date()
    const allDeals = await prisma.sponsoredDeal.findMany({
      where: {
        active: true,
        expiresAt: {
          gt: now
        }
      }
    })

    // 2. Fetch user to check preferences (using their default category or past transactions)
    // For now, we'll mock a preference or fetch their top spending category
    const user = await prisma.user.findUnique({ where: { id: userId }})
    
    // Simplification for user preference: let's assume we know what they like 
    // based on their top spending category (we can query this if needed)
    const topCategories = await prisma.transaction.groupBy({
      by: ['categoryId'],
      where: { userId, type: 'expense' },
      _count: { categoryId: true },
      orderBy: { _count: { categoryId: 'desc' } },
      take: 1
    })
    
    let preferredCategoryName = "General";
    if (topCategories.length > 0 && topCategories[0].categoryId) {
      const cat = await prisma.category.findUnique({ where: { id: topCategories[0].categoryId }})
      if (cat) preferredCategoryName = cat.name;
    }

    // 3. Filter by distance and apply scoring
    const nearbyDeals = allDeals.map(deal => {
      const distance = getDistanceInMeters(latitude, longitude, deal.latitude, deal.longitude)
      return { ...deal, distance }
    }).filter(deal => deal.distance <= deal.radiusMeters)

    // 4. Scoring Algorithm
    const scoredDeals = nearbyDeals.map(deal => {
      let score = 0;
      
      // Tier weights
      if (deal.tier === 'enterprise') score += 50;
      if (deal.tier === 'pro') score += 25;
      
      // User preference match
      // If the deal's category matches the user's top spending category (or contains words)
      if (deal.category.toLowerCase() === preferredCategoryName.toLowerCase()) {
        score += 30;
      }
      
      return { ...deal, score }
    })

    // Sort by score (descending), then by distance (ascending)
    scoredDeals.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.distance - b.distance;
    })

    // Log impression for top deal to BigQuery for B2B Analytics
    if (scoredDeals.length > 0) {
      const top = scoredDeals[0]
      logDealImpressionToBigQuery({
        dealId: top.id,
        companyName: top.companyName,
        userId,
        userLatitude: latitude,
        userLongitude: longitude,
        distanceMeters: top.distance,
        timestamp: new Date().toISOString()
      }).catch(err => console.error("BigQuery log error:", err))
    }

    return NextResponse.json({ deals: scoredDeals })
  } catch (error) {
    console.error("Error in nearby deals API:", error)
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 })
  }
}
