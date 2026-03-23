import type { Deal } from "../types/Deal.ts";

export const useDealsApi = () => {
  const getDeals = async (): Promise<Deal[]> => {
    const response = await fetch('http://localhost:3000/deals');

    if(response.status !== 200) {
      throw new Error('Failed to fetch deals');
    }

    const data = await response.json();

    return data ?? [];
  }

  const getDealById = async (id: string): Promise<Deal | undefined> => {
    const response = await fetch(`http://localhost:3000/deals/${id}`);

    if(response.status !== 200) {
      throw new Error('Failed to fetch deal');
    }

    const data = await response.json();

    return data ?? null;
  }

  return {
    getDeals,
    getDealById
  }
};