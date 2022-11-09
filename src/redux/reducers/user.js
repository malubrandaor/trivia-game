import { GET_USER_INFO } from '../actions';

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
  default:
    return state;
  }
}

export default userReducer;
