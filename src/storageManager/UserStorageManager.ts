import type StorageManagerInterface from '@/interfaces/StorageManagerInterface';

const UserStorageManager: StorageManagerInterface = {
  key: 'users',
  get() {
    const data: string | null = localStorage.getItem(this.key);
    if (!data) return;

    return JSON.parse(data);
  },
  set(data: any) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
};

export default UserStorageManager;