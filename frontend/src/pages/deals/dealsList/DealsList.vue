<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDealsStore } from "../../../app/store";
import { useDebounceFn } from '@vueuse/core';

// Components
import AppTable from "../../../shared/components/table/AppTable.vue";
import AppChip from "../../../shared/components/chip/AppChip.vue";
import DealsFilter from "./components/DealsFilter.vue";

// Types
import type { Deal } from "../../../shared/types/Deal.ts";
import type { Filters } from "../../../shared/types/Filters.ts";

// Enum
import { DealStatus } from "../../../shared/enums/DealStatus";

// Utils
import { toDate } from "../../../shared/utils/ToDate";
import { truncateMiddle } from "../../../shared/utils/TruncateMiddle.ts";

// Init
const { t } = useI18n();
const dealsStore = useDealsStore();
const router = useRouter();

// Data
const search = ref('');
const filters = ref<Filters>({
  statuses: [],
  amount: { min: null, max: null},
  date: { from: null, to: null }
});
const pageSize = ref(10);
const header = [
  { label: 'ID', key: 'id' },
  { label: 'Deal Name', key: 'name' },
  { label: 'Account Name', key: 'accountName' },
  { label: 'Status', key: 'status' },
  { label: 'Amount', key: 'amount' },
  { label: 'Created At', key: 'createdAt' }
];


const deals = computed(() => {
  return dealsStore.deals;
});

const filteredDeals = computed(() => {
  const normalized = search.value.trim().toLowerCase()

  return deals.value.filter((deal: Deal) => {
    // Filter By Search
    const matchesSearch =
      !normalized ||
      deal.name.toLowerCase().includes(normalized) ||
      deal.accountName.toLowerCase().includes(normalized) ||
      deal.status.toLowerCase().includes(normalized) ||
      deal.id.toLowerCase().includes(normalized)


    // Filter By Status
    const matchesStatus = !filters.value.statuses.length || filters.value.statuses.includes(deal.status);

    // Filter By Amount
    const { min, max } = filters.value.amount;
    const matchesAmount = (min === null || deal.amount >= min) && (max === null || deal.amount <= max);

    // Filter By Dates
    const dealDate = new Date(deal.createdAt).getTime();
    const fromDate = filters.value.date.from ? new Date(filters.value.date.from).getTime() : null;
    const toDate = filters.value.date.to ? new Date(filters.value.date.to).getTime() : null;
    const matchesDate = (!fromDate || dealDate >= fromDate) && (!toDate || dealDate <= toDate);


    return matchesSearch && matchesStatus && matchesAmount && matchesDate;
  })
});

const activeFiltersCount = computed(() => {
  let count = 0

  if (filters.value.statuses.length) count++
  if (filters.value.amount.min !== null || filters.value.amount.max !== null) count++
  if (filters.value.date.from || filters.value.date.to) count++
  if (search.value) count++

  return count
});


// Methods
const getStatusColor = (status: DealStatus) => {
  switch (status) {
    case DealStatus.Approved:
      return 'green';
    case DealStatus.Rejected:
      return 'red';
    default:
      return 'primary';
  }
}

const handleRowClick = (deal: Deal) => {
  router.push(`/deals/${deal.id}`);
};

const handleSearch = () => {
  console.log('search:', search.value)
  // тут викликаєш store.fetchDeals()
}

const debouncedSearch = useDebounceFn(handleSearch, 300)

const clearFilters = () => {
  filters.value = {
    statuses: [],
    amount: {
      min: null,
      max: null
    },
    date: {
      from: null,
      to: null
    }
  }

  search.value = ''
}

watch(search, () => {
  debouncedSearch()
})

onMounted(() => {
  dealsStore.fetchDeals();
});
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold">
        {{ t('DealsList.Title') }}
      </h2>
    </div>

    <!-- Filters -->
    <DealsFilter
      class="mb-5"
      v-model:search="search"
      v-model:filters="filters"
      :activeFiltersCount="activeFiltersCount"
      @clear="clearFilters"
    ></DealsFilter>

    <!-- Table -->
    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <AppTable
        :header="header"
        :items="filteredDeals"
        :search="search"
        :pageSize="pageSize"
        @row-click="handleRowClick"
      >
        <template #cell-id="{ value }">
          {{ truncateMiddle(value) }}
        </template>

        <template #cell-status="{ value }">
          <AppChip
            :value="value"
            :color="getStatusColor(value)"
          ></AppChip>
        </template>

        <template #cell-createdAt="{ value }">
          {{ toDate(value) }}
        </template>
      </AppTable>
    </div>
  </div>
</template>

<style scoped>
</style>