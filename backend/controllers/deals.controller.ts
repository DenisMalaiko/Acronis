import { getAllDeals, getSingleDealById } from '../services/deals.service.js';
import { Deal } from '../shared/entities/deal.entity.js';

export const getDeals = (req: any, res: any) => {
  try {
    const data: Deal[] = getAllDeals();

    if (!data) {
      return sendResponse(res, 404, { message: 'Deals not found' })
    }

    return sendResponse(res, 200, data)
  } catch (error) {
    return sendResponse(res, 500, { message: 'Internal server error' })
  }
};

export const getDealById = (req: any, res: any, id: string) => {
  try {
    if (!id || typeof id !== 'string') {
      return sendResponse(res, 400, { message: 'Invalid ID' })
    }

    const data: Deal | undefined = getSingleDealById(id);

    if (!data) {
      return sendResponse(res, 404, { message: 'Deal not found' })
    }

    return sendResponse(res, 200, data)
  } catch (error) {
    return sendResponse(res, 500, { message: 'Internal server error' })
  }
};

function sendResponse(res: any, status: number, data: any) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}