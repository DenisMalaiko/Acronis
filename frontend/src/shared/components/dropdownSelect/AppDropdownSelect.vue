<script setup lang="ts" generic="T extends string">
import { ref, defineProps, defineEmits } from 'vue';
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  modelValue: T[]
  options: T[]
  label?: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: T[]): void
}>();

const open = ref(false);
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  open.value = false
})

function toggle(option: T) {
  const exists = props.modelValue.includes(option)

  let newValue: T[]

  if (exists) {
    newValue = props.modelValue.filter(v => v !== option)
  } else {
    newValue = [...props.modelValue, option]
  }

  emit('update:modelValue', newValue)
}

</script>

<template>
  <div ref="dropdownRef" class="relative w-64">
    <button
        @click="open = !open"
        class="w-full border rounded px-3 py-2 text-left"
    >
      <span v-if="modelValue.length">
        {{ modelValue.join(', ') }}
      </span>
      <span v-else class="text-gray-400">
        {{label ? label : 'Select...'}}
      </span>
    </button>

    <div
      v-if="open"
      class="absolute mt-1 w-full bg-white border rounded shadow z-10"
    >
      <div
        v-for="option in options"
        :key="option"
        class="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
        @click="toggle(option)"
      >
        <input
          type="checkbox"
          :checked="modelValue.includes(option)"
        />
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>