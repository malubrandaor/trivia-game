export const GET_USER_INFO = 'GET_USER_INFO';

export function getUserInfo(payload) {
  return {
    type: GET_USER_INFO,
    payload,
  };
}
