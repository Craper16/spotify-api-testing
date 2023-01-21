import axios from 'axios';
import { BASE_URL } from '../helpers/consts';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 7000,
});
