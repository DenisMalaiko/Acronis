import { createRouter, createWebHistory } from 'vue-router'
import DealsList from "../../pages/deals/dealsList/DealsList.vue";
import DealsView from "../../pages/deals/dealsView/DealsView.vue";
import NotFound from "../../pages/notFound/NotFound.vue";

const routes = [
  { path: '/', name: 'deals', component: DealsList },
  { path: '/deals/:id', name: 'deals-view', component: DealsView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;