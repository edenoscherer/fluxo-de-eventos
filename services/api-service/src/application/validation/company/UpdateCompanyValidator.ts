import { IValidator, ValidationResult } from '../../../domain/validation/IValidator.js';
import { UpdateCompanyInput } from '../../../domain/validation/company/CompanyValidation.js';
import { CompanyStatus } from '../../../domain/entities/Company.js';
import { Email } from '../../../domain/value-objects/Email.js';

export class UpdateCompanyValidator implements IValidator<UpdateCompanyInput> {
  validate(data: UpdateCompanyInput): ValidationResult {
    const errors = [];

    // Validar nome se fornecido
    if (data.name !== undefined) {
      if (data.name.length < 2 || data.name.length > 100) {
        errors.push({
          field: 'name',
          message: 'Nome da empresa deve ter entre 2 e 100 caracteres',
        });
      }
    }

    // Validar nome fantasia se fornecido
    if (data.tradingName !== undefined) {
      if (data.tradingName.length < 2 || data.tradingName.length > 100) {
        errors.push({
          field: 'tradingName',
          message: 'Nome fantasia deve ter entre 2 e 100 caracteres',
        });
      }
    }

    // Validar email se fornecido
    if (data.email !== undefined) {
      try {
        Email.create(data.email);
      } catch (error) {
        errors.push({
          field: 'email',
          message: 'Email inválido',
        });
      }
    }

    // Validar telefone se fornecido
    if (data.phone !== undefined) {
      if (data.phone.length < 10 || data.phone.length > 11) {
        errors.push({
          field: 'phone',
          message: 'Telefone deve ter entre 10 e 11 dígitos',
        });
      }
    }

    // Validar status se fornecido
    if (data.status !== undefined) {
      const validStatus = Object.values(CompanyStatus);
      if (!validStatus.includes(data.status)) {
        errors.push({
          field: 'status',
          message: 'Status inválido',
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
