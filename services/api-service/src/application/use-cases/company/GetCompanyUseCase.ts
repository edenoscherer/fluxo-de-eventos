import { ICompanyRepository } from '../../../domain/repositories/ICompanyRepository';
import { CompanyDTO, CompanyMapper } from '../../dtos/CompanyDTO';

export class GetCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<CompanyDTO> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new Error('Empresa não encontrada');
    }

    return CompanyMapper.toDTO(company);
  }
}
