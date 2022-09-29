import http from '@/api/http';
import type { UserInterface } from '@/interfaces/UserInterface';

export default {
  async getAll(): Promise<UserInterface[]> {
    const {data} = await http.get('users');

    return data;
  },
  async create(payload: UserInterface): Promise<UserInterface> {
    const {data} = await http.post('users', payload);

    return data;
  }
};