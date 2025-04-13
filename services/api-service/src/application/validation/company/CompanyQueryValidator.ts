import { IValidator, ValidationResult } from '@/domain/validation/IValidator';
import { CompanyQueryInput } from '@/domain/validation/company/CompanyValidation';
import { CompanyStatus } from '@/domain/entities/Company';
import { Cnpj } from '@/domain/value-objects/Cnpj';

type ValidationError = {
  field: string;
  message: string;
};

export class CompanyQueryValidator implements IValidator<CompanyQueryInput> {
  validate(data: CompanyQueryInput): ValidationResult {
    const errors: ValidationError[] = [];

    // Validar CNPJ se fornecido
    if (data.cnpj !== undefined) {
      try {
        Cnpj.create(data.cnpj);
      } catch (error: unknown) {
        errors.push({
          field: 'cnpj',
          message: 'CNPJ inválido',
        });
      }
    }

    // Validar status se fornecido
    if (data.status !== undefined) {
      const validStatus: CompanyStatus[] = Object.values(CompanyStatus);
      if (!validStatus.includes(data.status)) {
        errors.push({
          field: 'status',
          message: 'Status inválido',
        });
      }
    }

    // Validar página
    if (!Number.isInteger(data.page) || data.page < 1) {
      errors.push({
        field: 'page',
        message: 'Página deve ser um número inteiro maior que 0',
      });
    }

    // Validar limite por página
    if (!Number.isInteger(data.limit) || data.limit < 1 || data.limit > 100) {
      errors.push({
        field: 'limit',
        message: 'Limite por página deve ser um número inteiro entre 1 e 100',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
