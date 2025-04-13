import { CompanyListResponseDTO } from '@/application/dtos/CompanyDTO';
import { ICompanyRepository } from '@/domain/repositories/ICompanyRepository';
import { CompanyQueryInput } from '@/domain/validation/company/CompanyValidation';

export class ListCompaniesUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(query: CompanyQueryInput): Promise<CompanyListResponseDTO> {
    const { page, limit, status } = query;
    let result: CompanyListResponseDTO;

    if (status) {
      result = await this.companyRepository.findByStatus(status, page, limit);
    } else {
      result = await this.companyRepository.findAll(page, limit);
    }

    return {
      companies: result.companies.map(CompanyMapper.toDTO),
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    };
  }
}
