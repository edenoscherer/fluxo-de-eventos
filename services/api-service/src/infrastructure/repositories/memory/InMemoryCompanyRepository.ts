import { Company, CompanyStatus } from '@/domain/entities/Company';
import { ICompanyRepository } from '@/domain/repositories/ICompanyRepository';
import { CompanyQueryInput } from '@/domain/validation/company/CompanyValidation';

export class InMemoryCompanyRepository implements ICompanyRepository {
  private companies: Company[] = [];

  async create(company: Company): Promise<Company> {
    const newCompany = { ...company };
    this.companies.push(newCompany);
    return newCompany;
  }

  async findById(id: string): Promise<Company | null> {
    const company = this.companies.find(company => company.id === id);
    return company || null;
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = this.companies.find(company => company.cnpj.getValue() === cnpj);
    return company || null;
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = this.companies.find(company => company.email.getValue() === email);
    return company || null;
  }

  async findAll(query: CompanyQueryInput): Promise<{ companies: Company[]; total: number }> {
    let filteredCompanies = [...this.companies];

    // Apply filters
    if (query.status) {
      filteredCompanies = filteredCompanies.filter(company => company.status === query.status);
    }

    if (query.cnpj) {
      filteredCompanies = filteredCompanies.filter(company => company.cnpj.getValue().includes(query.cnpj!));
    }

    // Calculate pagination
    const total = filteredCompanies.length;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

    return {
      companies: paginatedCompanies,
      total,
    };
  }

  async update(company: Company): Promise<Company> {
    const index = this.companies.findIndex(c => c.id === company.id);
    if (index === -1) {
      throw new Error('Empresa não encontrada');
    }

    this.companies[index] = { ...company };
    return this.companies[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.companies.findIndex(company => company.id === id);
    if (index === -1) {
      throw new Error('Empresa não encontrada');
    }

    this.companies.splice(index, 1);
  }

  async findByStatus(status: CompanyStatus): Promise<Company[]> {
    return this.companies.filter(company => company.status === status);
  }

  // Helper method for testing
  clear(): void {
    this.companies = [];
  }
}