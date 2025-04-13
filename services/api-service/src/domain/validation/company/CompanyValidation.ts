import { CompanyStatus } from '../../entities/Company.js';

export interface CreateCompanyInput {
  name: string;
  tradingName: string;
  cnpj: string;
  email: string;
  phone: string;
  status: CompanyStatus;
}

export interface UpdateCompanyInput {
  name?: string;
  tradingName?: string;
  email?: string;
  phone?: string;
  status?: CompanyStatus;
}

export interface CompanyQueryInput {
  page: number;
  limit: number;
  status?: CompanyStatus;
  cnpj?: string;
}
