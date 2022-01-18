import { atom } from 'recoil';

export const userAccessTokenState = atom({
  key: 'userAccessTokenState',
  default: '',
});
