import { Request, Response } from 'express';
import { CreateCompanyUseCase } from '../../../application/use-cases/company/CreateCompanyUseCase';
import { GetCompanyUseCase } from '../../../application/use-cases/company/GetCompanyUseCase';
import { UpdateCompanyUseCase } from '../../../application/use-cases/company/UpdateCompanyUseCase';
import { DeleteCompanyUseCase } from '../../../application/use-cases/company/DeleteCompanyUseCase';
import { ListCompaniesUseCase } from '../../../application/use-cases/company/ListCompaniesUseCase';
import { CreateCompanyValidator } from '../../../application/validation/company/CreateCompanyValidator';
import { UpdateCompanyValidator } from '../../../application/validation/company/UpdateCompanyValidator';
import { CompanyQueryValidator } from '../../../application/validation/company/CompanyQueryValidator';

export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly listCompaniesUseCase: ListCompaniesUseCase,
    private readonly createCompanyValidator: CreateCompanyValidator,
    private readonly updateCompanyValidator: UpdateCompanyValidator,
    private readonly companyQueryValidator: CompanyQueryValidator
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = this.createCompanyValidator.validate(req.body);
      const company = await this.createCompanyUseCase.execute(validatedData);
      return res.status(201).json(company);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const company = await this.getCompanyUseCase.execute(id);
      return res.status(200).json(company);
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const validatedData = this.updateCompanyValidator.validate(req.body);
      const company = await this.updateCompanyUseCase.execute(id, validatedData);
      return res.status(200).json(company);
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteCompanyUseCase.execute(id);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Empresa não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const query = this.companyQueryValidator.validate(req.query);
      const companies = await this.listCompaniesUseCase.execute(query);
      return res.status(200).json(companies);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}