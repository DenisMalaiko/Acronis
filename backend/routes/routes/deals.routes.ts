import { getDeals, getDealById } from '../../controllers/deals.controller.js';

export const dealsRoutes = (req: any, res: any) => {
  const { url, method } = req;

  if (url === '/deals' && method === 'GET') {
    getDeals(req, res);
    return true;
  }

  if (url.startsWith('/deals/') && method === 'GET') {
    const id = url.split('/')[2];

    getDealById(req, res, id);
    return true;
  }

  return false;
};