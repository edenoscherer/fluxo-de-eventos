import { createApp } from '../http/app';
import { CompanyController } from '../http/controllers/CompanyController';
import { CreateCompanyUseCase } from '../../application/use-cases/company/CreateCompanyUseCase';
import { GetCompanyUseCase } from '../../application/use-cases/company/GetCompanyUseCase';
import { UpdateCompanyUseCase } from '../../application/use-cases/company/UpdateCompanyUseCase';
import { DeleteCompanyUseCase } from '../../application/use-cases/company/DeleteCompanyUseCase';
import { ListCompaniesUseCase } from '../../application/use-cases/company/ListCompaniesUseCase';
import { CreateCompanyValidator } from '../../application/validation/company/CreateCompanyValidator';
import { UpdateCompanyValidator } from '../../application/validation/company/UpdateCompanyValidator';
import { CompanyQueryValidator } from '../../application/validation/company/CompanyQueryValidator';
import { InMemoryCompanyRepository } from '../repositories/memory/InMemoryCompanyRepository';

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Inicialização dos repositórios
const companyRepository = new InMemoryCompanyRepository();

// Inicialização dos validadores
const createCompanyValidator = new CreateCompanyValidator();
const updateCompanyValidator = new UpdateCompanyValidator();
const companyQueryValidator = new CompanyQueryValidator();

// Inicialização dos casos de uso
const createCompanyUseCase = new CreateCompanyUseCase(companyRepository);
const getCompanyUseCase = new GetCompanyUseCase(companyRepository);
const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository);
const deleteCompanyUseCase = new DeleteCompanyUseCase(companyRepository);
const listCompaniesUseCase = new ListCompaniesUseCase(companyRepository);

// Inicialização dos controllers
const companyController = new CompanyController(
  createCompanyUseCase,
  getCompanyUseCase,
  updateCompanyUseCase,
  deleteCompanyUseCase,
  listCompaniesUseCase,
  createCompanyValidator,
  updateCompanyValidator,
  companyQueryValidator
);

// Criação da aplicação Express
const app = createApp(companyController);

// Inicialização do servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor API rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/api/health`);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não tratado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promessa rejeitada não tratada:', promise, 'motivo:', reason);
  process.exit(1);
});