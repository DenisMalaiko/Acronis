import { dealsRoutes } from './routes/deals.routes.js';

export const router = (req: any, res: any) => {
  return (
    dealsRoutes(req, res)
  );
};