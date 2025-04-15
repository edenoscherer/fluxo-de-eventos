import { Cnpj } from '@/domain/value-objects/Cnpj';

// Mock da classe Cnpj para testes
export class CnpjMock {
  private readonly value: string;

  private constructor(cnpj: string) {
    this.value = cnpj.replace(/[^\d]/g, '');
  }

  static create(cnpj: string): Cnpj {
    // Bypass validation for tests
    return {
      getValue: () => cnpj.replace(/[^\d]/g, ''),
      getFormatted: () => cnpj,
      equals: (other: Cnpj) => cnpj.replace(/[^\d]/g, '') === other.getValue()
    } as Cnpj;
  }
}