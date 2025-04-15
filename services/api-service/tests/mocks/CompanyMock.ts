import { Company, CompanyProps, CompanyStatus } from '@/domain/entities/Company';
import { CnpjMock } from './CnpjMock';
import { EmailMock } from './EmailMock';

// Mock da classe Company para testes
export class CompanyMock {
  static create(props: Partial<CompanyProps> = {}): Company {
    const defaultProps: CompanyProps = {
      id: props.id || 'test-id',
      name: props.name || 'Empresa Teste',
      tradingName: props.tradingName || 'Teste LTDA',
      cnpj: props.cnpj || CnpjMock.create('45.448.325/0001-92'),
      email: props.email || EmailMock.create('contato@teste.com'),
      phone: props.phone || '11999999999',
      status: props.status || CompanyStatus.ACTIVE,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };

    return {
      ...defaultProps,
      updateName: (name: string) => {},
      updateTradingName: (tradingName: string) => {},
      updateEmail: (email: any) => {},
      updatePhone: (phone: string) => {},
      updateStatus: (status: CompanyStatus) => {},
      toJSON: () => ({
        ...defaultProps,
        cnpj: defaultProps.cnpj.getFormatted(),
        email: defaultProps.email.getValue(),
      }),
    } as Company;
  }
}