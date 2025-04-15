import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UpdateCompanyUseCase } from '@/application/use-cases/company/UpdateCompanyUseCase';
import { CreateCompanyUseCase } from '@/application/use-cases/company/CreateCompanyUseCase';
import { InMemoryCompanyRepository } from '@/infrastructure/repositories/memory/InMemoryCompanyRepository';
import { CompanyStatus } from '@/domain/entities/Company';
import { CreateCompanyInput, UpdateCompanyInput } from '@/domain/validation/company/CompanyValidation';
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

describe('UpdateCompanyUseCase', () => {
  let companyRepository: InMemoryCompanyRepository;
  let updateCompanyUseCase: UpdateCompanyUseCase;
  let createCompanyUseCase: CreateCompanyUseCase;
  let createdCompanyId: string;

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();
    updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository);
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

    // Create another company for email conflict test
    const anotherCompanyData: CreateCompanyInput = {
      name: 'Outra Empresa',
      tradingName: 'Outra LTDA',
      cnpj: '11.222.333/0001-44',
      email: 'outro@teste.com',
      phone: '11888888888',
      status: CompanyStatus.ACTIVE,
    };

    const createdCompany = await createCompanyUseCase.execute(companyData);
    await createCompanyUseCase.execute(anotherCompanyData);
    createdCompanyId = createdCompany.id!;
  });

  it('should update a company successfully', async () => {
    const updateData: UpdateCompanyInput = {
      name: 'Empresa Atualizada',
      tradingName: 'Atualizada LTDA',
      phone: '11777777777',
      status: CompanyStatus.INACTIVE,
    };

    const result = await updateCompanyUseCase.execute(createdCompanyId, updateData);

    expect(result).toBeDefined();
    expect(result.id).toBe(createdCompanyId);
    expect(result.name).toBe(updateData.name);
    expect(result.tradingName).toBe(updateData.tradingName);
    expect(result.phone).toBe(updateData.phone);
    expect(result.status).toBe(updateData.status);
    // These should remain unchanged
    expect(result.cnpj).toBe('45.448.325/0001-92');
    expect(result.email).toBe('contato@teste.com');
  });

  it('should update email successfully', async () => {
    const updateData: UpdateCompanyInput = {
      email: 'novo@teste.com',
    };

    const result = await updateCompanyUseCase.execute(createdCompanyId, updateData);

    expect(result).toBeDefined();
    expect(result.email).toBe(updateData.email);
  });

  it('should throw an error if company does not exist', async () => {
    const nonExistentId = 'non-existent-id';
    const updateData: UpdateCompanyInput = {
      name: 'Empresa Atualizada',
    };

    await expect(updateCompanyUseCase.execute(nonExistentId, updateData)).rejects.toThrow('Empresa não encontrada');
  });

  it('should throw an error if email is already in use by another company', async () => {
    const updateData: UpdateCompanyInput = {
      email: 'outro@teste.com', // Email already used by another company
    };

    await expect(updateCompanyUseCase.execute(createdCompanyId, updateData)).rejects.toThrow(
      'Já existe uma empresa cadastrada com este e-mail'
    );
  });
});