export class Cnpj {
  private readonly value: string;

  private constructor(cnpj: string) {
    this.value = Cnpj.removeFormat(cnpj);
  }

  static create(cnpj: string): Cnpj {
    const unformattedCnpj = Cnpj.removeFormat(cnpj);
    if (!Cnpj.isValid(unformattedCnpj)) {
      throw new Error('CNPJ inválido');
    }
    return new Cnpj(unformattedCnpj);
  }

  private static removeFormat(cnpj: string): string {
    return cnpj.replace(/[^\d]/g, '');
  }

  private static isValid(cnpj: string): boolean {
    if (cnpj.length !== 14) return false;

    // Validação do CNPJ
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }

  getValue(): string {
    return this.value;
  }

  getFormatted(): string {
    return this.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  equals(other: Cnpj): boolean {
    return this.value === other.value;
  }
}
