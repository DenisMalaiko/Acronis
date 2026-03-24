import { defineStore } from 'pinia';
import { useDealsApi } from "../../../shared/api/useDealsApi.ts";
import { deduplicateDeals } from "../../../shared/utils/DeduplicateDeals.ts";
import type { Deal } from "../../../shared/types/Deal.ts";

export const useDealsStore = defineStore('deals', {
  state: () => ({
    deals: [] as Deal[],
    deal: {} as Deal | null,

    loading: false as boolean,
    error: null as any
  }),

  actions: {
    async fetchDeals() {
      const { getDeals } = useDealsApi();
      this.loading = true;
      this.error = null;

      try {
        const deals = await getDeals();
        this.deals = deduplicateDeals(deals);
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchDealById(id: string) {
      const { getDealById } = useDealsApi();
      this.loading = true;
      this.error = null;

      try {
        this.deal = (await getDealById(id)) ?? null;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
})