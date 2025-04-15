import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetCompanyUseCase } from '@/application/use-cases/company/GetCompanyUseCase';
import { CreateCompanyUseCase } from '@/application/use-cases/company/CreateCompanyUseCase';
import { InMemoryCompanyRepository } from '@/infrastructure/repositories/memory/InMemoryCompanyRepository';
import { CompanyStatus } from '@/domain/entities/Company';
import { CreateCompanyInput } from '@/domain/validation/company/CompanyValidation';
import { CnpjMock } from '../../../mocks/CnpjMock';
import { EmailMock } from '../../../mocks/EmailMock';
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

describe('GetCompanyUseCase', () => {
  let companyRepository: InMemoryCompanyRepository;
  let getCompanyUseCase: GetCompanyUseCase;
  let createCompanyUseCase: CreateCompanyUseCase;
  let createdCompanyId: string;

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();
    getCompanyUseCase = new GetCompanyUseCase(companyRepository);
    createCompanyUseCase = new CreateCompanyUseCase(companyRepository);

    // Create a test company
    const companyData: CreateCompanyInput = {
      name: 'Empresa Teste',
      tradingName: 'Teste LTDA',
      cnpj: '45.448.325/0001-92',
      email: 'contato@teste.com',
      phone: '11999999999',
      status: CompanyStatus.ACTIVE,
    };

    const createdCompany = await createCompanyUseCase.execute(companyData);
    createdCompanyId = createdCompany.id!;
  });

  it('should get a company by ID successfully', async () => {
    const result = await getCompanyUseCase.execute(createdCompanyId);

    expect(result).toBeDefined();
    expect(result.id).toBe(createdCompanyId);
    expect(result.name).toBe('Empresa Teste');
    expect(result.tradingName).toBe('Teste LTDA');
    expect(result.cnpj).toBe('45.448.325/0001-92');
    expect(result.email).toBe('contato@teste.com');
    expect(result.phone).toBe('11999999999');
    expect(result.status).toBe(CompanyStatus.ACTIVE);
  });

  it('should throw an error if company does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    await expect(getCompanyUseCase.execute(nonExistentId)).rejects.toThrow('Empresa não encontrada');
  });
});