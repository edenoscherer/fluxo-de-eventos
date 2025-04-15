import express, { Express } from 'express';
import { setupRoutes } from '../routes';
import { CompanyController } from '../controllers/CompanyController';

export const createApp = (companyController: CompanyController): Express => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    return next();
  });

  // Rotas
  app.use('/api', setupRoutes(companyController));

  // Middleware de erro 404
  app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
  });

  return app;
};