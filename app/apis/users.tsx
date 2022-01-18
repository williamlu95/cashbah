import axios from 'axios';
import { API_URL } from '@env';

export const createUser = async (user: {
  name: string,
  phoneNumber: string,
  email: string,
  password: string,
}) : Promise<string> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};
