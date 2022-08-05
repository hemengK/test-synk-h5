/**
 * loading状态管理
 */

export interface IHttpLoading {
  [key: string]: boolean;
}

let HTTP_LOADINGS: IHttpLoading = {};

const updateHttpLoadingStatus = (status: IHttpLoading): void => {
  HTTP_LOADINGS = { ...HTTP_LOADINGS, ...status };
};

const getLoadingByKey = (key: string): boolean => {
  return HTTP_LOADINGS[key] || false;
};

const getLoadingByKeyBuckets = (keys: string[]): boolean => {
  let res = false;
  keys.forEach((key) => {
    res = res || getLoadingByKey(key);
  });
  return res;
};

export { updateHttpLoadingStatus, getLoadingByKey, getLoadingByKeyBuckets };
