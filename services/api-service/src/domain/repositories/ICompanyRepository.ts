import { Company } from '@/domain/entities/Company';

export interface ICompanyRepository {
  create(company: Company): Promise<Company>;
  findById(id: string): Promise<Company | null>;
  findByCnpj(cnpj: string): Promise<Company | null>;
  findByEmail(email: string): Promise<Company | null>;
  findAll(
    page?: number,
    limit?: number,
  ): Promise<{
    companies: Company[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  update(company: Company): Promise<Company>;
  delete(id: string): Promise<void>;
  findByStatus(
    status: Company['status'],
    page?: number,
    limit?: number,
  ): Promise<{
    companies: Company[];
    total: number;
    page: number;
    totalPages: number;
  }>;
}
