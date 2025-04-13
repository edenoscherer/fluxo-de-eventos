import { ICompanyRepository } from '@/domain/repositories/ICompanyRepository';
import { CompanyDTO, CompanyMapper } from '@/application/dtos/CompanyDTO';
import { UpdateCompanyInput } from '@/domain/validation/company/CompanyValidation';
import { Email } from '@/domain/value-objects/Email';

export class UpdateCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(id: string, data: UpdateCompanyInput): Promise<CompanyDTO> {
    // Buscar empresa existente
    const existingCompany = await this.companyRepository.findById(id);
    if (!existingCompany) {
      throw new Error('Empresa não encontrada');
    }

    // Verificar se o email está sendo atualizado e se já existe
    if (data.email && data.email !== existingCompany.email.getValue()) {
      const email = Email.create(data.email);
      const existingCompanyByEmail = await this.companyRepository.findByEmail(email.getValue());
      if (existingCompanyByEmail) {
        throw new Error('Já existe uma empresa cadastrada com este e-mail');
      }
    }

    // Atualizar os campos permitidos
    CompanyMapper.toUpdateDomain(existingCompany, data);

    // Persistir as alterações
    const updatedCompany = await this.companyRepository.update(existingCompany);

    // Retornar DTO
    return CompanyMapper.toDTO(updatedCompany);
  }
}
