import { GET_USER_INFO, RESET_USER } from '../actions';

const INITIAL_STATE = {
  emailG: '',
  nome: '',
  score: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      emailG: action.payload.email,
      nome: action.payload.nome,
    };
  case RESET_USER:
    return {
      emailG: '',
      nome: '',
      score: 0,
    };
  case 'GET_TIMER':
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
