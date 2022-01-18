import axios from 'axios';
import { API_URL } from '@env';

export const authenticate = async (credentials: {
  email: string,
  password: string,
}) : Promise<string> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};
