export const deepClone = (data: object) => {
  return JSON.parse(JSON.stringify(data));
};
export const generateId = (): string => {
  return Math.random().toString(32).slice(10);
};