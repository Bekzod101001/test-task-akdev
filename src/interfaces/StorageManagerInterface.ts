export default interface StorageManagerInterface {
  key: string,
  get: () => any,
  set: (data: any) => void,
}