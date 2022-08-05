import { Toast } from 'antd-mobile';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { setAxiosCancel } from './http-cancel';
import {
  BaseHttpResponse,
  HTTP_ERROR_MESSAGES,
  IRequestInterceptor,
  RESPONSE_CODE,
} from './http-contranst';
import { IHttpLoading, updateHttpLoadingStatus } from './http-loading';

let baseUrl = '';

const USE_LOG = false; //process.env.env !== 'prod';

/**
 * 设置请求域名
 * @param uri
 */
export const setBaseUrl = (uri: string): void => {
  baseUrl = uri;
};

const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

const requestConfigInterceptors: Array<IRequestInterceptor> = [];

export const addRequestInterceptors = (func: IRequestInterceptor): void => {
  requestConfigInterceptors.push(func);
};

const cookieRequestInterceptors: IRequestInterceptor = (
  config: AxiosRequestConfig,
): AxiosRequestConfig => {
  if (Cookies.get('Authorization')) {
    config.headers['Authorization'] = Cookies.get('Authorization');
  }
  return config;
};

addRequestInterceptors(cookieRequestInterceptors);

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.url) {
      const reqStatus: IHttpLoading = {
        [config.url]: true,
      };
      updateHttpLoadingStatus(reqStatus);
    }
    const requestKey =
      JSON.stringify(config.url) +
      JSON.stringify(config.method) +
      JSON.stringify(config.data || '');
    config.cancelToken = new axios.CancelToken((cancel) => {
      setAxiosCancel(requestKey, cancel);
    });
    USE_LOG && console.log('request >>> ', config);

    // 处理请求配置，包括header等
    return requestConfigInterceptors.reduce((preConfig, interceptor) => {
      return interceptor(preConfig);
    }, config);
  },
  (error) => {
    if (error?.url) {
      const reqStatus: IHttpLoading = {
        [error.url]: true,
      };
      updateHttpLoadingStatus(reqStatus);
    }
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse<BaseHttpResponse<any>>) => {
    USE_LOG && console.log('response >>> ', response);

    if (response.config.url) {
      const reqStatus: IHttpLoading = {
        [response.config.url]: true,
      };
      updateHttpLoadingStatus(reqStatus);
    }
    if (response.status !== 200) {
      const { code, data, message } = response.data;
      if (code === RESPONSE_CODE.SUCCESS) {
        return Promise.resolve(data);
      } else if (code === RESPONSE_CODE.UNAUTH) {
        return Promise.reject(new Error(message || HTTP_ERROR_MESSAGES[code]));
      } else {
        return Promise.reject(
          new Error(message || HTTP_ERROR_MESSAGES.DEFAULT),
        );
      }
    } else {
      return response;
    }
  },
  (error) => {
    if (error?.config?.url) {
      const reqStatus: IHttpLoading = {
        [error.config.url]: true,
      };
      updateHttpLoadingStatus(reqStatus);
    }
    return Promise.reject(error);
  },
);

/**
 * 发起post请求
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export const post = <T>(
  url: string,
  data: Record<string, any>,
  headers: Record<string, any> = {},
): Promise<T> => {
  return new Promise((resolve, reject) => {
    request({
      url,
      data,
      headers,
      method: 'POST',
    }).then(
      (res) => {
        if (
          res.data.code === RESPONSE_CODE.SUCCESS ||
          res.data.code === RESPONSE_CODE.SUCCESS_200000
        ) {
          return resolve(res.data);
        } else {
          if (res.data.code !== RESPONSE_CODE.SUCCESS_400001) {
            if (res.data.code === RESPONSE_CODE.SUCCESS_600001) {
              var lang = navigator.language;
              lang = lang.substr(0, 2);
              let msg = '抱歉，未成功获取到用户信息，无法操作';
              if (lang !== 'zh') {
                msg = `Sorry, We're unable to fetch user data, this page is unoperatable`;
              }
              Toast.fail(
                msg,
                2,
                () => {
                  wx.closeWindow();
                },
                true,
              );
            } else {
              Toast.fail((res.data && res.data.message) || '网络异常，请重试');
            }
          }
        }
      },
      (err) => {
        Toast.fail((err && err.message) || '网络异常，请重试');
        return reject(err);
      },
    );
  });
};

/**
 * 发起get请求
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export const get = <T>(
  url: string,
  data: Record<string, any> = {},
  headers: Record<string, any> = {},
): Promise<T> => {
  return new Promise((resolve, reject) => {
    request({
      url,
      params: data,
      headers,
      method: 'GET',
    }).then(
      (res) => {
        if (res.data.code) {
          if (
            res.data.code === RESPONSE_CODE.SUCCESS ||
            res.data.code === RESPONSE_CODE.SUCCESS_200000
          ) {
            return resolve(res.data);
          } else {
            if (res.data.code !== RESPONSE_CODE.SUCCESS_400001) {
              if (res.data.code === RESPONSE_CODE.SUCCESS_600001) {
                var lang = navigator.language;
                lang = lang.substr(0, 2);
                let msg = '抱歉，未成功获取到用户信息，无法操作';
                if (lang !== 'zh') {
                  msg = `Sorry, We're unable to fetch user data, this page is unoperatable`;
                }
                Toast.fail(
                  msg,
                  2,
                  () => {
                    wx.closeWindow();
                  },
                  true,
                );
              } else {
                Toast.fail(
                  (res.data && res.data.message) || '网络异常，请重试',
                );
              }
            }
            return reject(res.data);
          }
        } else {
          return resolve(res.data);
        }
      },
      (err) => {
        Toast.fail((err && err.message) || '网络异常，请重试');
        return reject(err);
      },
    );
  });
};

export default request;
