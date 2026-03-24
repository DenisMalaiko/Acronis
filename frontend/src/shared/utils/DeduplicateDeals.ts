import type { Deal } from "../types/Deal.js";

export function deduplicateDeals(deals: Deal[]): Deal[] {
  const map = new Map<string, Deal>()

  for (const deal of deals) {
    const existing = map.get(deal.id)

    if (!existing) {
      map.set(deal.id, deal)
      continue
    }

    const existingDate = new Date(existing.createdAt).getTime()
    const newDate = new Date(deal.createdAt).getTime()

    if (newDate > existingDate) {
      map.set(deal.id, deal)
    }
  }

  return Array.from(map.values())
}