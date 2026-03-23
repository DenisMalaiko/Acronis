import { getAllDeals, getSingleDealById } from '../services/deals.service.js';
import { Deal } from '../shared/entities/deal.entity.js';

export const getDeals = (req: any, res: any) => {
  const data: Deal[] = getAllDeals();

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const getDealById = (req: any, res: any, id: string) => {
  const data: Deal | undefined = getSingleDealById(id);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};