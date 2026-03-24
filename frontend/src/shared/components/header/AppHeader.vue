<template>
  <header class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b shadow-sm">
    <div class="flex items-center gap-4">
      <router-link to="/">
        <h1 class="text-xl font-semibold text-gray-800">Acronis</h1>
      </router-link>
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
        v-model="user"
        class="px-3 py-2 border rounded-lg text-sm bg-gray-50 hover:bg-gray-100"
      >
        <option
          v-for="user in users"
          :key="user.id"
          :value="user"
        >
          {{ user.role }} | {{ user.id }}
        </option>
      </select>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { LANGUAGES } from "../../const/Languages.ts";
import { i18n } from "../../../app/i18n";
import { useUsersStore} from "../../../app/store";
import { partner1, partner2, admin } from "../../const/Users.ts";

const usersStore = useUsersStore();

type Locale = 'en' | 'de' | 'es' | 'ja';

const language = ref<Locale>('en');

// Computed
const user = computed({
  get: () => usersStore.user,
  set: (value) => {
    usersStore.setUser(value);
  }
});

const users = computed(() => {
  return [partner1, partner2, admin]
})


watch(language, (val) => {
  i18n.global.locale.value = val;
});
</script>