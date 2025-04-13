import { ICompanyRepository } from '../../../domain/repositories/ICompanyRepository';

export class DeleteCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new Error('Empresa não encontrada');
    }

    await this.companyRepository.delete(id);
  }
}
