import { deals } from '../data/deals.data.js';
import { Deal } from '../shared/entities/deal.entity.js';

export const getAllDeals = async (): Promise<Deal[]> => {
  console.log("-------------")
  console.log("GET ALL DEALS")
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("RESPONSE")
  console.log("-------------")
  return deals;
};

export const getSingleDealById = async (id: string): Promise<Deal | undefined> => {
  console.log("-------------")
  console.log("GET ALL DEAL")
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("RESPONSE")
  console.log("-------------")
  return deals.find(deal => deal.id === id);
};