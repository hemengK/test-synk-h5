import { Canceler } from 'axios';

const axiosCancel: Record<string, Canceler> = {};

/**
 * 添加某个请求
 * @param key
 * @param value
 */
export const setAxiosCancel = (key: string, value: Canceler) => {
  axiosCancel[key] = value;
};

/**
 * 取消某个请求
 * @param key
 */
export const cancelAxiosByKey = (key: string) => {
  axiosCancel[key]('取消了请求');
};

/**
 * 取消所有请求
 */
export const cancelAllAxios = () => {
  Object.keys(axiosCancel).forEach((key) => cancelAxiosByKey(key));
};
