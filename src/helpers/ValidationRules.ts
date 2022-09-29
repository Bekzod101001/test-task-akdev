export const mustContainTwoWords = (value: string): boolean => {
  return value.split(' ').length >= 2;
};