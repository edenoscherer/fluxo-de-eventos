import { CompanyDTO, CompanyMapper } from '@/application/dtos/CompanyDTO';
import { Company, CompanyStatus } from '@/domain/entities/Company';
import { CreateCompanyInput, UpdateCompanyInput } from '@/domain/validation/company/CompanyValidation';
import { CnpjMock } from './CnpjMock';
import { EmailMock } from './EmailMock';
import { CompanyMock } from './CompanyMock';

// Mock da classe CompanyMapper para testes
export class CompanyMapperMock {
  static toDTO(company: Company): CompanyDTO {
    return {
      id: company.id,
      name: company.name,
      tradingName: company.tradingName,
      cnpj: company.cnpj.getFormatted(),
      email: company.email.getValue(),
      phone: company.phone,
      status: company.status,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }

  static toDomain(dto: CreateCompanyInput): Company {
    return CompanyMock.create({
      name: dto.name,
      tradingName: dto.tradingName,
      cnpj: CnpjMock.create(dto.cnpj),
      email: EmailMock.create(dto.email),
      phone: dto.phone,
      status: dto.status,
    });
  }

  static toUpdateDomain(company: Company, dto: UpdateCompanyInput): void {
    // Atualiza diretamente as propriedades do objeto company
    if (dto.name) {
      company.name = dto.name;
    }
    if (dto.tradingName) {
      company.tradingName = dto.tradingName;
    }
    if (dto.email) {
      company.email = EmailMock.create(dto.email);
    }
    if (dto.phone) {
      company.phone = dto.phone;
    }
    if (dto.status) {
      company.status = dto.status;
    }
  }
}