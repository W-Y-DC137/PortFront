export const loginRequest = (credentials) => ({
    type: 'LOGIN_REQUEST',
    payload: credentials,
  });
  
  export const loginSuccess = (data) => ({
    type: 'LOGIN_SUCCESS',
    payload: data,
  });
  
  export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
  });
  