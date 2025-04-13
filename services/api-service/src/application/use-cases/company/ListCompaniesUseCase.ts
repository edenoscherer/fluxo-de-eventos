import { ICompanyRepository } from '../../../domain/repositories/ICompanyRepository';
import { CompanyDTO, CompanyMapper, CompanyListResponseDTO } from '../../dtos/CompanyDTO';
import { CompanyQueryInput } from '../../validation/CompanySchemas';

export class ListCompaniesUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(query: CompanyQueryInput): Promise<CompanyListResponseDTO> {
    const { page, limit, status } = query;
    let result;

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
