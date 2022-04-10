import { API_URL } from '@env';
import axios from 'axios';

export const RELATIONSHIP_TYPE = Object.freeze({
  ACTIVE: 'active',
  PENDING: 'pending',
  BLOCKED: 'blocked',
});

export const createUserRelationship = async (userRelationship: {
  relatedToUserId: string,
  type: string,
}) : Promise<void> => {
  await axios.post(`${API_URL}/user-relationships`, userRelationship);
};

export type RelatedUser = {
  id: string;
  type: string;
  name: string;
};

export const getRelatedUsers = async () : Promise<RelatedUser[]> => {
  const repsonse = await axios.get(`${API_URL}/user-relationships`);
  return repsonse.data;
};

export const getPendingRequests = async () : Promise<RelatedUser[]> => {
  const repsonse = await axios.get(`${API_URL}/user-relationships/pending-requests`);
  return repsonse.data;
};

export const deleteRequest = async (id: string) : Promise<void> => {
  await axios.delete(`${API_URL}/user-relationships/${id}`);
};

export const acceptRequest = async (id: string) : Promise<void> => {
  await axios.post(`${API_URL}/user-relationships/${id}/accept-request`);
};
