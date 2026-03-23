<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
    <div class="flex items-center gap-4">
      <h1 class="text-xl font-semibold text-gray-800">Acronis {{ language }}</h1>
    </div>

    <div class="flex items-center gap-4">

      <select
        v-model="language"
        class="px-3 py-2 border rounded-lg text-sm bg-gray-50 hover:bg-gray-100"
      >
        <option
          v-for="language in LANGUAGES"
          :key="language.value"
          :value="language.value"
        >{{ language.icon }}  {{ language.label }}</option>
      </select>

      <select
        v-model="role"
        class="px-3 py-2 border rounded-lg text-sm bg-gray-50 hover:bg-gray-100"
      >
        <option
          v-for="role in Object.values(UserRoles)"
          :key="role"
          :value="role"
        >
          {{ role }}
        </option>
      </select>

      <div class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
        D
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { LANGUAGES } from "../../const/Languages.ts";
import { UserRoles } from "../../enums/UserRoles.ts";

const language = ref(LANGUAGES[0].value);
const role = ref(UserRoles.Admin);

watch(language, (val) => {
  console.log('Language changed:', val);
});

watch(role, (val) => {
  console.log('Role changed:', val);
});
</script>