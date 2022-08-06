import { DocumentUtil } from '../document.util';

export const cpfRefineValidator = (value: string): string | undefined =>
  DocumentUtil.isValidCPF(value) ? undefined : 'O CPF informado é inválido';
