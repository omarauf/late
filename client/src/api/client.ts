import axios from 'axios';
import { getToken, setToken } from '../utils/token';
import { refreshToken } from './auth';

export const cancelTokenSource = axios.CancelToken.source();
export const controller = new AbortController();

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  cancelToken: cancelTokenSource.token,
  signal: controller.signal,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// const handleCancelRequest = () => {
//   cancelTokenSource.cancel('Request was canceled');
// };

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // add token to request header when user login
    const prevRequest = config;
    const token = getToken();
    if (token) {
      prevRequest.headers = { Authorization: `Bearer ${token}` };
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
    return prevRequest;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error),
);

// Add a response interceptor
const responseInterceptors = instance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const prevRequest = error.config;
    if (error.response) {
      // Access Token was expired or user not authorized
      if (error.response.status === 401) {
        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        instance.interceptors.response.eject(responseInterceptors);
        const { data } = await refreshToken();
        const { accessToken } = data;
        setToken(accessToken);
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(prevRequest);
      }
    }

    return Promise.reject(error.response);
  },
);
