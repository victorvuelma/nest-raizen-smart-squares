import { DocumentUtil } from '../document.util';

export const cpfRefineValidator = (value: string): boolean => {
  return DocumentUtil.isValidCPF(value);
};
