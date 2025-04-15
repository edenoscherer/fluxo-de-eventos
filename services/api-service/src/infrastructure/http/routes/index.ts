import { Router } from 'express';
import { companyRoutes } from './companyRoutes';
import { CompanyController } from '../controllers/CompanyController';

export const setupRoutes = (companyController: CompanyController): Router => {
  const router = Router();

  // Rotas de empresas
  router.use('/companies', companyRoutes(companyController));

  // Rota de saúde da API
  router.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return router;
};