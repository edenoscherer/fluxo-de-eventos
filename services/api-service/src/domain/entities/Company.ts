import { Email } from '@/domain/value-objects/Email';
import { Cnpj } from '@/domain/value-objects/Cnpj';

export const CompanyStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
} as const;

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];

export interface CompanyProps {
  id?: string;
  name: string;
  tradingName: string;
  cnpj: Cnpj;
  email: Email;
  phone: string;
  status: CompanyStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Company {
  private props: CompanyProps;

  constructor(props: CompanyProps) {
    this.validateProps(props);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  private validateProps(props: CompanyProps): void {
    if (props.name.length < 2 || props.name.length > 100) {
      throw new Error('Nome da empresa deve ter entre 2 e 100 caracteres');
    }

    if (props.tradingName.length < 2 || props.tradingName.length > 100) {
      throw new Error('Nome fantasia deve ter entre 2 e 100 caracteres');
    }

    if (props.phone.length < 10 || props.phone.length > 11) {
      throw new Error('Telefone deve ter entre 10 e 11 dígitos');
    }
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get tradingName(): string {
    return this.props.tradingName;
  }

  get cnpj(): Cnpj {
    return this.props.cnpj;
  }

  get email(): Email {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  get status(): CompanyStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  updateName(name: string): void {
    if (name.length < 2 || name.length > 100) {
      throw new Error('Nome da empresa deve ter entre 2 e 100 caracteres');
    }
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  updateTradingName(tradingName: string): void {
    if (tradingName.length < 2 || tradingName.length > 100) {
      throw new Error('Nome fantasia deve ter entre 2 e 100 caracteres');
    }
    this.props.tradingName = tradingName;
    this.props.updatedAt = new Date();
  }

  updateEmail(email: Email): void {
    this.props.email = email;
    this.props.updatedAt = new Date();
  }

  updatePhone(phone: string): void {
    if (phone.length < 10 || phone.length > 11) {
      throw new Error('Telefone deve ter entre 10 e 11 dígitos');
    }
    this.props.phone = phone;
    this.props.updatedAt = new Date();
  }

  updateStatus(status: CompanyStatus): void {
    this.props.status = status;
    this.props.updatedAt = new Date();
  }

  toJSON(): Omit<CompanyProps, 'cnpj' | 'email'> & { cnpj: string; email: string } {
    return {
      ...this.props,
      cnpj: this.props.cnpj.getFormatted(),
      email: this.props.email.getValue(),
    };
  }
}
