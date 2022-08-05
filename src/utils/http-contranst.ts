import { AxiosRequestConfig } from 'axios';

export const RESPONSE_CODE = {
  SUCCESS: 200,
  UNAUTH: 401,
  SUCCESS_200000: 200000,
  SUCCESS_400001: 400001,
  SUCCESS_600001: 600001,
};

/**
 * response基类
 */
export interface BaseHttpResponse<T> {
  code: number;
  message: string;
  data?: T;
  [key: string]: any;
}

export const HTTP_ERROR_MESSAGES = {
  DEFAULT: '网络请求出错',
  [RESPONSE_CODE.UNAUTH]: '登录失效，请重新登录',
};

export interface IRequestInterceptor {
  (config: AxiosRequestConfig): AxiosRequestConfig;
}
