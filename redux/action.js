export const LOGIN = 'LOGIN';

export const login = email => ({
  type: LOGIN,
  payload: {
    email
  }
});