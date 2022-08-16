import * as dayjs from 'dayjs';

export const dateValidRefineValidator = (value: string): boolean => {
  return dayjs(value).isValid();
};
