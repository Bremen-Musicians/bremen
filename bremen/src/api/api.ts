import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://k10a104.p.ssafy.io/api/v1',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  withCredentials: true,
});
