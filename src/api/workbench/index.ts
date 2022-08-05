import { IBaseResponse } from '@/api/interface';
import { getBaseUrl } from '@/utils/env-utils';
import { get, post } from '@/utils/http-request';
import {
  IUpdateApplicationsReq,
  IWorkbenchCategoryReq,
  IWorkbenchCategoryRes,
  IWorkbenchRedirectUrlRes,
} from './interface';

export const baseUrl = getBaseUrl();

/* 获取分类列表 */
export const getWorkbenchCategory = (params: IWorkbenchCategoryReq) => {
  return get<IBaseResponse<Array<IWorkbenchCategoryRes>>>(
    `${baseUrl}/abi-cloud-ipeople/workbench/category/application/list`,
    params,
  );
};

/* 获取应用重定向跳转链接 */
export const getRedirectUrl = (params: IWorkbenchRedirectUrlRes) => {
  return get<IBaseResponse<string>>(
    `${baseUrl}/abi-cloud-ipeople/workbench/application/url`,
    params,
  );
};

/* 更新分类下应用 */
export const updateApplicationsInCategory = (
  data: Array<IUpdateApplicationsReq>,
) => {
  return post<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/workbench/category/application`,
    data,
  );
};
