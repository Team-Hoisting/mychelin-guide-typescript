import axios from 'axios';
import { User } from '../types';
import { signupSchema, signinSchema } from '../schema';

// const BASE_URL = 'http://localhost:8888/api';

// const authApi = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

const url = `/api/auth`;

const signUp = async (user: signupSchema) => {
  const response = await axios.post(`${url}/signup`, user);

  return response.data;
};

const signIn = async (user: signinSchema) => {
  const response = await axios.post(`${url}/signin`, user);

  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${url}/logout`);

  return response.data;
};

const check = async () => {
  const response = await axios.get(`${url}/check`);

  return response.data;
};

const checkEmail = async (email: string) => {
  const response = await axios.post(`${url}/checkEmail`, { email });

  return response;
};

const checkNickname = async (nickname: string) => {
  const response = await axios.post(`${url}/checkNickname`, { nickname });

  return response;
};

export { signUp, signIn, logout, check, checkEmail, checkNickname };
