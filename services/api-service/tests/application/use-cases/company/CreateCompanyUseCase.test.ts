import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateCompanyUseCase } from '@/application/use-cases/company/CreateCompanyUseCase';
import { InMemoryCompanyRepository } from '@/infrastructure/repositories/memory/InMemoryCompanyRepository';
import { CompanyStatus } from '@/domain/entities/Company';
import { CreateCompanyInput } from '@/domain/validation/company/CompanyValidation';
import { CnpjMock } from '../../../mocks/CnpjMock';
import { EmailMock } from '../../../mocks/EmailMock';
import { CompanyMock } from '../../../mocks/CompanyMock';
import { CompanyMapperMock } from '../../../mocks/CompanyDTOMock';

// Mock Cnpj.create to bypass validation
vi.mock('@/domain/value-objects/Cnpj', () => {
  return {
    Cnpj: {
      create: (cnpj: string) => CnpjMock.create(cnpj)
    }
  };
});

// Mock Email.create to bypass validation
vi.mock('@/domain/value-objects/Email', () => {
  return {
    Email: {
      create: (email: string) => EmailMock.create(email)
    }
  };
});

// Mock CompanyMapper
vi.mock('@/application/dtos/CompanyDTO', () => {
  return {
    CompanyMapper: {
      toDomain: (dto: any) => CompanyMapperMock.toDomain(dto),
      toDTO: (company: any) => CompanyMapperMock.toDTO(company),
      toUpdateDomain: (company: any, dto: any) => CompanyMapperMock.toUpdateDomain(company, dto)
    }
  };
});

describe('CreateCompanyUseCase', () => {
  let companyRepository: InMemoryCompanyRepository;
  let createCompanyUseCase: CreateCompanyUseCase;

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository();
    createCompanyUseCase = new CreateCompanyUseCase(companyRepository);
  });

  it('should create a new company successfully', async () => {
    const companyData: CreateCompanyInput = {
      name: 'Empresa Teste',
      tradingName: 'Teste LTDA',
      cnpj: '45.448.325/0001-92',
      email: 'contato@teste.com',
      phone: '11999999999',
      status: CompanyStatus.ACTIVE,
    };

    const result = await createCompanyUseCase.execute(companyData);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(companyData.name);
    expect(result.tradingName).toBe(companyData.tradingName);
    expect(result.cnpj).toBe('45.448.325/0001-92');
    expect(result.email).toBe(companyData.email);
    expect(result.phone).toBe(companyData.phone);
    expect(result.status).toBe(companyData.status);
  });

  it('should throw an error if company with same CNPJ already exists', async () => {
    const companyData: CreateCompanyInput = {
      name: 'Empresa Teste',
      tradingName: 'Teste LTDA',
      cnpj: '45.448.325/0001-92',
      email: 'contato@teste.com',
      phone: '11999999999',
      status: CompanyStatus.ACTIVE,
    };

    await createCompanyUseCase.execute(companyData);

    const duplicateCompanyData: CreateCompanyInput = {
      name: 'Outra Empresa',
      tradingName: 'Outra LTDA',
      cnpj: '45.448.325/0001-92', // Same CNPJ
      email: 'outro@teste.com',
      phone: '11888888888',
      status: CompanyStatus.ACTIVE,
    };

    await expect(createCompanyUseCase.execute(duplicateCompanyData)).rejects.toThrow(
      'Já existe uma empresa cadastrada com este CNPJ'
    );
  });

  it('should throw an error if company with same email already exists', async () => {
    const companyData: CreateCompanyInput = {
      name: 'Empresa Teste',
      tradingName: 'Teste LTDA',
      cnpj: '45.448.325/0001-92',
      email: 'contato@teste.com',
      phone: '11999999999',
      status: CompanyStatus.ACTIVE,
    };

    await createCompanyUseCase.execute(companyData);

    const duplicateCompanyData: CreateCompanyInput = {
      name: 'Outra Empresa',
      tradingName: 'Outra LTDA',
      cnpj: '11.222.333/0001-44', // Different CNPJ
      email: 'contato@teste.com', // Same email
      phone: '11888888888',
      status: CompanyStatus.ACTIVE,
    };

    await expect(createCompanyUseCase.execute(duplicateCompanyData)).rejects.toThrow(
      'Já existe uma empresa cadastrada com este e-mail'
    );
  });
});