import { defineStore } from 'pinia';
import { i18n } from "../../i18n";
import { useDealsApi } from "../../../shared/api/useDealsApi.ts";
import { deduplicateDeals } from "../../../shared/utils/DeduplicateDeals.ts";
import type { Deal } from "../../../shared/types/Deal.ts";


export const useDealsStore = defineStore('deals', {
  state: () => ({
    deals: [] as Deal[],
    deal: {} as Deal | null,
    lastFetched: null as number | null,

    loading: false as boolean,
    error: null as any
  }),

  actions: {
    async fetchDeals() {
      const now = Date.now();

      if (this.loading) return;

      if (this.lastFetched && now - this.lastFetched < 10000) {
        return this.deals;
      }

      const { getDeals } = useDealsApi();
      this.loading = true;
      this.error = null;

      try {
        const deals = await getDeals();
        this.deals = deduplicateDeals(deals);
        this.lastFetched = now;
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = i18n.global.t('Errors.UnhandledError');
        }
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
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = i18n.global.t('Errors.UnhandledError');
        }
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
})