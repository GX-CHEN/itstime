import { LOGIN, REGISTER } from '../const/credential';
import { loginService, registerService } from '../model/apiService';

export const login = (username, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload: loginService(username, password)
    });
  };
};

export const register = (username, password) => {
  return dispatch => {
    return dispatch({
      type: REGISTER,
      payload: registerService(username, password)
    });
  };
};
