import { Email } from '@/domain/value-objects/Email';

// Mock da classe Email para testes
export class EmailMock {
  private readonly value: string;

  private constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Email {
    // Bypass validation for tests
    return {
      getValue: () => email,
      equals: (other: Email) => email === other.getValue()
    } as Email;
  }
}