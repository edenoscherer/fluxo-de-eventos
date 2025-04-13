export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface IValidator<T> {
  validate(data: T): ValidationResult;
}
