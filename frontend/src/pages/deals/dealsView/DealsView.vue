<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDealsStore } from "../../../app/store";
import { useToast } from "vue-toastification";

// Components
import AppChip from "../../../shared/components/chip/AppChip.vue";

// Enum
import { DealStatus } from "../../../shared/enums/DealStatus";

// Utils
import { toDate } from "../../../shared/utils/ToDate";

// Init
const { t } = useI18n();
const dealsStore = useDealsStore();
const router = useRouter();
const $toast = useToast();


const deal = computed(() => dealsStore.deal);
const loading = computed(() => dealsStore.loading);
const error = computed(() => dealsStore.error);

// Methods
const goBack = () => {
  router.back();
};

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

const fetchDeal = async () => {
  try {
    const dealId = router.currentRoute.value.params.id;
    await dealsStore.fetchDealById(dealId as string);
  } catch (error) {
    $toast.error(error instanceof Error ? error.message : t('General.UnhandledError'));
  }
};

const retry = async () => {
  await fetchDeal()
}

onMounted(async () => {
  await fetchDeal()
})

</script>

<template>
  <div class="p-0 sm:p-6 space-y-4 sm:space-y-6">

    <!-- Header -->
    <div class="flex items-center gap-4">
      <button
        @click="goBack"
        class="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 cursor-pointer"
      >
        ← {{ t('General.Back') }}
      </button>

      <div>
        <h2 class="text-gray-500">
          {{ t('DealsView.Title') }}
        </h2>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-gray-500 w-full text-center">
      {{ t('General.Loading') }}...
    </div>

    <!--  Error -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
    >
      <p class="text-red-600 font-medium">
        {{ error }}
      </p>

      <button
        @click="goBack"
        class="mt-4 mr-2 px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        {{ t('General.Back') }}
      </button>

      <button
        @click="retry"
        class="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        {{ t('General.Retry') }}
      </button>
    </div>

    <!-- Content -->
    <div
      v-else-if="deal"
      class="bg-white border rounded-xl p-6 space-y-4"
    >
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-500">{{ t('General.DealName') }}</p>
          <p class="font-medium">{{ deal?.name }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">{{ t('General.AccountName') }}</p>
          <p class="font-medium">{{ deal?.accountName }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">{{ t('General.Status') }}</p>
          <span v-if="deal?.status">
            <AppChip
              :value="deal?.status"
              :color="getStatusColor(deal?.status)"
            ></AppChip>
          </span>
        </div>

        <div>
          <p class="text-sm text-gray-500">{{ t('General.Amount') }}</p>
          <p class="font-medium">${{ deal?.amount }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">{{ t('General.CreatedAt') }}</p>
          <p class="font-medium">
            <span v-if="deal?.createdAt">
              {{ toDate(deal?.createdAt) }}
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>