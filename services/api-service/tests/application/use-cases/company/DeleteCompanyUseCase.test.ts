import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteCompanyUseCase } from '@/application/use-cases/company/DeleteCompanyUseCase';
import { CreateCompanyUseCase } from '@/application/use-cases/company/CreateCompanyUseCase';
import { GetCompanyUseCase } from '@/application/use-cases/company/GetCompanyUseCase';
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

describe('DeleteCompanyUseCase', () => {
  let companyRepository: InMemoryCompanyRepository;
  let deleteCompanyUseCase: DeleteCompanyUseCase;
  let createCompanyUseCase: CreateCompanyUseCase;
  let getCompanyUseCase: GetCompanyUseCase;
  let createdCompanyId: string;

  beforeEach(async () => {
    companyRepository = new InMemoryCompanyRepository();
    deleteCompanyUseCase = new DeleteCompanyUseCase(companyRepository);
    createCompanyUseCase = new CreateCompanyUseCase(companyRepository);
    getCompanyUseCase = new GetCompanyUseCase(companyRepository);

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

  it('should delete a company successfully', async () => {
    // Verify company exists before deletion
    const companyBeforeDeletion = await getCompanyUseCase.execute(createdCompanyId);
    expect(companyBeforeDeletion).toBeDefined();
    expect(companyBeforeDeletion.id).toBe(createdCompanyId);

    // Delete the company
    await deleteCompanyUseCase.execute(createdCompanyId);

    // Verify company no longer exists
    await expect(getCompanyUseCase.execute(createdCompanyId)).rejects.toThrow('Empresa não encontrada');
  });

  it('should throw an error if company does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    await expect(deleteCompanyUseCase.execute(nonExistentId)).rejects.toThrow('Empresa não encontrada');
  });
});