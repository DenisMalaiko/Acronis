import { deals } from '../data/deals.data.js';
import { Deal } from '../shared/entities/deal.entity.js';

export const getAllDeals = (): Deal[] => {
  return deals;
};

export const getSingleDealById = (id: string): Deal | undefined => {
  return deals.find(deal => deal.id === id);
};