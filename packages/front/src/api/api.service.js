import axios from 'axios';
import _ from 'lodash';
import fp from 'lodash/fp';

const BASE_URL = import.meta.env.VITE_SERVICE_API_HOST;
const ACCESS_DENIED_PATH = '/access-denied';

const redirectToAccessDenied = () => {
  if (window.location.pathname !== ACCESS_DENIED_PATH) {
    window.location.assign(ACCESS_DENIED_PATH);
  }
};

async function resetTokens() {
  const http = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return http.post('auth/refresh').then(fp.get('data.access_token'));
}

class ApiBackService {
  constructor() {
    this.accessToken = sessionStorage.getItem('access');
    this.accessTokenVersion = 0;
    this.refreshTokenPromise = null;
    this.http = axios.create({ baseURL: BASE_URL, withCredentials: true });
    this.initialToken = this.#refreshToken().catch(() => null); // пользователь может открыть приложение без сессии
    this.#setupHttp();
  }

  #configAttachAuth(config) {
    if (this.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.accessToken}`,
      };
    }
    return config;
  }

  #setAccessToken(token) {
    this.accessTokenVersion += 1;
    this.accessToken = token;
    if (token) {
      sessionStorage.setItem('access', token);
    } else {
      sessionStorage.removeItem('access');
    }
  }

  async #refreshToken() {
    if (!this.refreshTokenPromise) {
      const tokenVersion = this.accessTokenVersion;
      this.refreshTokenPromise = resetTokens()
        .then((token) => {
          this.#setAccessToken(token);
          return token;
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            if (this.accessTokenVersion === tokenVersion) this.#setAccessToken(null);
          }
          if (error?.response?.status === 403) {
            this.#setAccessToken(null);
            redirectToAccessDenied();
          }

          throw error;
        })
        .finally(() => {
          this.refreshTokenPromise = null;
        });
    }
    return this.refreshTokenPromise;
  }

  #setupHttp() {
    this.http.interceptors.request.use(async (config) => {
      if (config.url?.includes('/auth/login')) return config;
      await this.initialToken; // ждём начальный токен перед каждым запросом
      return this.#configAttachAuth(config);
    });

    this.http.interceptors.response.use(undefined, async (error) => {
      const originalRequest = error.config;

      if (!error.response) {
        return Promise.reject(error); // NETWORK ERROR
      }

      if (originalRequest.url?.includes('/auth/login')) {
        return Promise.reject(error);
      }

      if (error.response.status === 403) {
        redirectToAccessDenied();
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const tokenVersion = this.accessTokenVersion;

        try {
          const newToken = await this.#refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return this.http(originalRequest);
        } catch {
          if (this.accessTokenVersion === tokenVersion) this.#setAccessToken(null);
          if (window.location.pathname !== '/login') window.location.assign('/login');
        }
      }

      return Promise.reject(error);
    });
  }

  async get(...args) {
    return this.http.get(...args).then(
      _.cond([
        [fp.has('data'), fp.get('data')],
        [fp.stubTrue, fp.identity],
      ])
    );
  }

  async post(...args) {
    return this.http.post(...args).then(fp.get('data'));
  }

  async put(...args) {
    return this.http.put(...args).then(fp.get('data'));
  }

  async delete(...args) {
    return this.http.delete(...args).then(fp.get('data'));
  }

  async patch(...args) {
    return this.http.patch(...args).then(fp.get('data'));
  }

  setAccessToken(token) {
    this.#setAccessToken(token);
  }
}

export const apiService = new ApiBackService();
