import { createRouter, createWebHistory } from 'vue-router'
import DealsList from "../../pages/deals/dealsList/DealsList.vue";
import DealsView from "../../pages/deals/dealsView/DealsView.vue";

const routes = [
  { path: '/', name: 'deals', component: DealsList },
  { path: '/deals/:id', name: 'deals-view', component: DealsView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;