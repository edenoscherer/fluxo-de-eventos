import { ICompanyRepository } from '../../../domain/repositories/ICompanyRepository.js';
import { CompanyDTO, CompanyMapper } from '../../dtos/CompanyDTO.js';
import { CreateCompanyInput } from '../../validation/CompanySchemas.js';
import { Cnpj } from '../../../domain/value-objects/Cnpj.js';
import { Email } from '../../../domain/value-objects/Email.js';

export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(data: CreateCompanyInput): Promise<CompanyDTO> {
    // Verificar se já existe uma empresa com o mesmo CNPJ
    const cnpj = Cnpj.create(data.cnpj);
    const existingCompanyByCnpj = await this.companyRepository.findByCnpj(cnpj.getValue());
    if (existingCompanyByCnpj) {
      throw new Error('Já existe uma empresa cadastrada com este CNPJ');
    }

    // Verificar se já existe uma empresa com o mesmo email
    const email = Email.create(data.email);
    const existingCompanyByEmail = await this.companyRepository.findByEmail(email.getValue());
    if (existingCompanyByEmail) {
      throw new Error('Já existe uma empresa cadastrada com este e-mail');
    }

    // Criar nova empresa
    const company = CompanyMapper.toDomain(data);

    // Persistir no repositório
    const createdCompany = await this.companyRepository.create(company);

    // Retornar DTO
    return CompanyMapper.toDTO(createdCompany);
  }
}
