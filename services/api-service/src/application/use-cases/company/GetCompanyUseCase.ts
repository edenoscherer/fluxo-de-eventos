import { ICompanyRepository } from '../../../domain/repositories/ICompanyRepository.js';
import { CompanyDTO, CompanyMapper } from '../../dtos/CompanyDTO.js';

export class GetCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}
  async execute(id: string): Promise<CompanyDTO> {
    try {
      const company = await this.companyRepository.findById(id);

      if (!company) {
        throw new Error('Empresa não encontrada');
      }

      return CompanyMapper.toDTO(company);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unexpected error occurred');
    }
  }
}
