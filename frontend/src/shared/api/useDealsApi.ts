import type { Deal } from "../types/Deal.ts";
import { fetchWithTimeout } from "../utils/FetchWithTimeout.ts";
import { handleError } from "../utils/HandleError.ts";

export const useDealsApi = () => {
  const getDeals = async (): Promise<Deal[]> => {
    const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const response = await fetchWithTimeout(`${API_URL}/deals`, 5000);
    if (!response.ok) handleError(response);
    const data = await response.json();

    return data ?? [];
  }

  const getDealById = async (id: string): Promise<Deal | undefined> => {
    const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const response = await await fetchWithTimeout(`${API_URL}/deals/${id}`, 5000);
    if (!response.ok) handleError(response);
    const data = await response.json();

    return data ?? null;
  }

  return {
    getDeals,
    getDealById
  }
};