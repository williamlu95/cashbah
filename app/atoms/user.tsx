import axios from 'axios';
import { atom, selector } from 'recoil';

export const userAccessTokenState = atom<string>({
  key: 'userAccessTokenState',
  default: '',
});

export const userAccessTokenSelector = selector<string>({
  key: 'userAccessTokenSelector',
  get: ({ get }) => get(userAccessTokenState),
  set: ({ set }, accessToken) => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }

    set(userAccessTokenState, accessToken);
  },
});
