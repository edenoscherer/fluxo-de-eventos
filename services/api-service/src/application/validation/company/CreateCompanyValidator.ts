import { IValidator, ValidationResult } from '@/domain/validation/IValidator';
import { CreateCompanyInput } from '@/domain/validation/company/CompanyValidation';
import { CompanyStatus } from '@/domain/entities/Company';
import { Email } from '@/domain/value-objects/Email';
import { Cnpj } from '@/domain/value-objects/Cnpj';

export class CreateCompanyValidator implements IValidator<CreateCompanyInput> {
  validate(data: CreateCompanyInput): ValidationResult {
    const errors = [];

    // Validar nome
    if (!data.name || data.name.length < 2 || data.name.length > 100) {
      errors.push({
        field: 'name',
        message: 'Nome da empresa deve ter entre 2 e 100 caracteres',
      });
    }

    // Validar nome fantasia
    if (!data.tradingName || data.tradingName.length < 2 || data.tradingName.length > 100) {
      errors.push({
        field: 'tradingName',
        message: 'Nome fantasia deve ter entre 2 e 100 caracteres',
      });
    }

    // Validar CNPJ
    try {
      Cnpj.create(data.cnpj);
    } catch (error) {
      errors.push({
        field: 'cnpj',
        message: 'CNPJ inválido',
      });
    }

    // Validar email
    try {
      Email.create(data.email);
    } catch (error) {
      errors.push({
        field: 'email',
        message: 'Email inválido',
      });
    }

    // Validar telefone
    if (!data.phone || data.phone.length < 10 || data.phone.length > 11) {
      errors.push({
        field: 'phone',
        message: 'Telefone deve ter entre 10 e 11 dígitos',
      });
    }

    // Validar status
    const validStatus = Object.values(CompanyStatus);
    if (!data.status || !validStatus.includes(data.status)) {
      errors.push({
        field: 'status',
        message: 'Status inválido',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
