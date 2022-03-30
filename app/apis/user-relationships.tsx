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
