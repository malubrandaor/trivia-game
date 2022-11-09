export const GET_USER_INFO = 'GET_USER_INFO';

export const getUserInfo = (payload) => ({
  type: GET_USER_INFO,
  payload,
});
