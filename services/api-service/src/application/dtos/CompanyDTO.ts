import { Company, CompanyStatus } from '@/domain/entities/Company';
import { Email } from '@/domain/value-objects/Email';
import { Cnpj } from '@/domain/value-objects/Cnpj';
import {
  CreateCompanyInput,
  UpdateCompanyInput,
  CompanyQueryInput,
} from '../validation/CompanySchemas';

export interface CompanyDTO {
  id?: string;
  name: string;
  tradingName: string;
  cnpj: string;
  email: string;
  phone: string;
  status: CompanyStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CompanyMapper {
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
    return new Company({
      name: dto.name,
      tradingName: dto.tradingName,
      cnpj: Cnpj.create(dto.cnpj),
      email: Email.create(dto.email),
      phone: dto.phone,
      status: dto.status,
    });
  }

  static toUpdateDomain(company: Company, dto: UpdateCompanyInput): void {
    if (dto.name) {
      company.updateName(dto.name);
    }
    if (dto.tradingName) {
      company.updateTradingName(dto.tradingName);
    }
    if (dto.email) {
      company.updateEmail(Email.create(dto.email));
    }
    if (dto.phone) {
      company.updatePhone(dto.phone);
    }
    if (dto.status) {
      company.updateStatus(dto.status);
    }
  }
}

export interface CompanyListResponseDTO {
  companies: CompanyDTO[];
  total: number;
  page: number;
  totalPages: number;
}
