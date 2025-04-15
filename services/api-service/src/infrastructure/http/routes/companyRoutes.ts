import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

export const companyRoutes = (companyController: CompanyController): Router => {
  const router = Router();

  // GET /companies - Lista todas as empresas
  router.get('/', (req, res) => companyController.list(req, res));

  // POST /companies - Cria uma nova empresa
  router.post('/', (req, res) => companyController.create(req, res));

  // GET /companies/:id - Obtém uma empresa específica
  router.get('/:id', (req, res) => companyController.getById(req, res));

  // PUT /companies/:id - Atualiza uma empresa
  router.put('/:id', (req, res) => companyController.update(req, res));

  // DELETE /companies/:id - Remove uma empresa
  router.delete('/:id', (req, res) => companyController.delete(req, res));

  return router;
};