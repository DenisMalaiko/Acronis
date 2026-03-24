<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { useI18n } from "vue-i18n";

// Components
import AppDropdownSelect from "../../../../shared/components/dropdownSelect/AppDropdownSelect.vue";

// Types
import type { Filters } from "../../../../shared/types/Filters.ts";

// Enums
import { DealStatus } from "../../../../shared/enums/DealStatus";

const { t } = useI18n();
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
    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
      <span class="text-sm text-gray-500">{{ t('General.Search') }}:</span>

      <input
        :value="props.search"
        @input="updateSearch"
        type="text"
        :placeholder="t('DealsList.SearchPlaceholder')"
        class="border rounded-lg px-3 py-2 text-sm w-64"
      />
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
      <span class="text-sm text-gray-500">{{ t('DealsList.Statuses') }}:</span>

      <AppDropdownSelect
        :options="statusOptions"
        :model-value="filters.statuses"
        @update:modelValue="updateStatuses"
        :label="t('General.Status')"
      ></AppDropdownSelect>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
      <span class="text-sm text-gray-500">{{ t('DealsList.Amount') }}:</span>

      <div class="flex flex-col sm:flex-row gap-2">
        <input
          :value="filters.amount.min ?? ''"
          @input="updateAmountMin"
          type="number"
          :placeholder="t('DealsList.MinAmount')"
          class="border px-2 py-1 w-24"
        />

        <input
          :value="filters.amount.max ?? ''"
          @input="updateAmountMax"
          type="number"
          :placeholder="t('DealsList.MaxAmount')"
          class="border px-2 py-1 w-24"
        />
      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
      <span class="text-sm text-gray-500">{{ t('DealsList.Dates') }}:</span>

      <div class="flex flex-col sm:flex-row gap-2">
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

    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
      <div class="flex items-center gap-2">
        <span
          v-if="activeFiltersCount"
          class="text-sm text-gray-600"
        >
          {{ t('DealsList.Filters') }} ({{ activeFiltersCount }})
        </span>
      </div>

      <button
        @click="clearFilters"
        class="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-md bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
      >
        {{ t('DealsList.ClearFilters') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>