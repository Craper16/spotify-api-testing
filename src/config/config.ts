import axios from 'axios';
import { BASE_URL } from '../helpers/consts';

const access_token = localStorage.getItem('access_token');

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${access_token}` },
  timeout: 7000,
});
