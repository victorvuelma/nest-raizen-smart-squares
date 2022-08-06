import { isValidCPF } from '@brazilian-utils/brazilian-utils';

export class DocumentUtil {
  static isValidCPF = (cpf: string): boolean => isValidCPF(cpf);
}
