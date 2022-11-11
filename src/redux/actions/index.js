export const GET_USER_INFO = 'GET_USER_INFO';
export const RESET_USER = 'RESET_USER';
export const CORRECT_ANSWERS = 'CORRECT_ANSWERS';

export function getUserInfo(payload) {
  return {
    type: GET_USER_INFO,
    payload,
  };
}

export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function getTimer(payload) {
  return {
    type: 'GET_TIMER',
    payload,

  };
}
