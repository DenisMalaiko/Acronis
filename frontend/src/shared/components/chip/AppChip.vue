<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  value: string,
  color?: string
}>();

const styles: Record<string, string> = {
  primary: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
};
</script>

<template>
  <span
    class="px-2 py-1 rounded text-sm font-medium inline-flex items-center"
    :class="props.color ? styles[props?.color] : 'bg-gray-100 text-gray-700'"
  >
    <slot :value="props.value">
      {{ props.value }}
    </slot>
  </span>
</template>

<style scoped>
</style>