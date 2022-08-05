import { IBaseResponse } from '@/api/interface';
import { getBaseUrl } from '@/utils/env-utils';
import { get, post } from '@/utils/http-request';
import {
  EditMessageParams,
  IJSApiInfoData,
  IJSApiInfoParams,
  TemplateListParams,
} from './interface';

export const baseUrl = getBaseUrl();

export const getJsApiInfo = (params: IJSApiInfoParams) => {
  return post<IBaseResponse<IJSApiInfoData>>(
    `${baseUrl}/dingtalk-server/getJsapiInfo`,
    params,
  );
};

// 根据ID获取模板信息
export const getModuleInfo = (params: IJSApiInfoParams) => {
  return get<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/managerMessage/templateById`,
    params,
  );
};

// 查看消息
export const getShowMessage = (params: IJSApiInfoParams) => {
  return post<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/managerMessage/showMessage`,
    params,
  );
};

// 模板列表
export const TemplateList = (params: TemplateListParams) => {
  return post<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/managerMessage/TemplateList`,
    params,
  );
};

// 音乐列表
export const musicList = (params) => {
  return post<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/managerMessage/musicList`,
    params,
  );
};

// 编辑消息:点击预览或提交接口触发
export const EditMessage = (params: EditMessageParams) => {
  return post<IBaseResponse<EditMessageParams>>(
    `${baseUrl}/abi-cloud-ipeople/managerMessage/edit`,
    params,
  );
};

// 提交消息：提交后点击确认触发
export const submitMessage = (params: ISubmitParams) => {
  return post<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/managerMessage/submitMessage`,
    params,
  );
};

// 员工感谢
export const staffThanks = (params: IJSApiInfoParams) => {
  return post<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/employeeMessage/beGrateful`,
    params,
  );
};

// 员工消息明细
export const staffMessage = (params: IJSApiInfoParams) => {
  return post<IBaseResponse<any>>(
    `${baseUrl}/abi-cloud-ipeople/employeeMessage/showMessage`,
    params,
  );
};
