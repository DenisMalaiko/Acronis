<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';

// Components
import AppDropdownSelect from "../../../../shared/components/dropdownSelect/AppDropdownSelect.vue";

// Types
import type { Filters } from "../../../../shared/types/Filters.ts";

// Enums
import { DealStatus } from "../../../../shared/enums/DealStatus";

const props = defineProps<{
  search: string,
  activeFiltersCount: number,
  filters: Filters
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:filters', value: any): void
  (e: 'clear'): void
}>()


const statusOptions = Object.values(DealStatus);

const updateSearch = (e: Event) => {
  const target = e.target as HTMLInputElement
  debouncedEmit(target.value)
}

const updateStatuses = (newStatuses: DealStatus[]) => {
  emit('update:filters', {
    ...props.filters,
    statuses: newStatuses
  })
}

const updateAmountMin = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = target.value === '' ? null : target.valueAsNumber;

  emit('update:filters', {
    ...props.filters,
    amount: {
      ...props.filters.amount,
      min: value
    }
  })
}

const updateAmountMax = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = target.value === '' ? null : target.valueAsNumber;

  emit('update:filters', {
    ...props.filters,
    amount: {
      ...props.filters.amount,
      max: value
    }
  })
}

const updateDateFrom = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:filters', {
    ...props.filters,
    date: {
      ...props.filters.date,
      from: target.value
    }
  })
}

const updateDateTo = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:filters', {
    ...props.filters,
    date: {
      ...props.filters.date,
      to: target.value
    }
  })
}

const clearFilters = () => {
  emit('clear');
}

const debouncedEmit = useDebounceFn((value: string) => {
  emit('update:search', value)
}, 300);
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-4">
    <div class="flex items-center gap-4 mb-4">
      <span class="text-sm text-gray-500">Search:</span>

      <input
        :value="props.search"
        @input="updateSearch"
        type="text"
        placeholder="Search deals..."
        class="border rounded-lg px-3 py-2 text-sm w-64"
      />
    </div>

    <div class="flex items-center gap-4 mb-4">
      <span class="text-sm text-gray-500">Statuses:</span>

      <AppDropdownSelect
        :options="statusOptions"
        :model-value="filters.statuses"
        @update:modelValue="updateStatuses"
        label="Status"
      ></AppDropdownSelect>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <span class="text-sm text-gray-500">Amount:</span>

      <div class="flex gap-2">
        <input
          :value="filters.amount.min ?? ''"
          @input="updateAmountMin"
          type="number"
          placeholder="Min"
          class="border px-2 py-1 w-24"
        />

        <input
          :value="filters.amount.max ?? ''"
          @input="updateAmountMax"
          type="number"
          placeholder="Max"
          class="border px-2 py-1 w-24"
        />
      </div>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <span class="text-sm text-gray-500">Dates:</span>

      <div class="flex gap-2">
        <input
          :value="filters.date.from ?? ''"
          @input="updateDateFrom"
          type="date"
          class="border px-2 py-1"
        />

        <input
          :value="filters.date.to ?? ''"
          @input="updateDateTo"
          type="date"
          class="border px-2 py-1"
        />
      </div>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <div class="flex items-center gap-2">
        <span
          v-if="activeFiltersCount"
          class="text-sm text-gray-600"
        >
          Filters ({{ activeFiltersCount }})
        </span>
      </div>

      <button
        @click="clearFilters"
        class="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-md bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>