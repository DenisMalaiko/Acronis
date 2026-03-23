<script setup lang="ts">
import { defineProps, ref, computed} from "vue";

type Header<T = any> = {
  label: string;
  key: keyof T & string;
};


const props = withDefaults(
  defineProps<{
    header: Header[];
    items: Record<string, any>[];
    pageSize?: number;
    search?: string;
  }>(),
  {
    pageSize: 10,
  }
);

const emit = defineEmits<{
  (e: 'row-click', row: any): void;
}>();


// Data
const currentPage = ref(1);

// Computed
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  return props.items.slice(start, start + props.pageSize);
});

const totalPages = computed(() => {
  return Math.ceil(props.items.length / props.pageSize);
});

</script>

<template>
  <div class="p-4">
    <table class="w-full border border-gray-200 rounded-xl overflow-hidden">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th
            v-for="col in props.header"
            :key="String(col.key)"
            class="p-3"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in paginatedItems"
          :key="item.id"
          class="border-t hover:bg-gray-50 cursor-pointer"
          @click="emit('row-click', item)"
        >
          <td
            v-for="col in props.header"
            :key="String(col.key)"
            class="p-3"
          >
            <slot
              :name="`cell-${String(col.key)}`"
              :value="item[col.key]"
              :row="item"
              :column="col"
            >
              {{ item[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>


    <div class="flex items-center justify-between mt-4">
      <!-- Info -->
      <div class="text-sm text-gray-500">
        Page {{ currentPage }} of {{ totalPages }}
      </div>

      <!-- Controls -->
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>