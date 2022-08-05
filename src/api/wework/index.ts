import { IBaseResponse } from '@/api/interface';
import { getBaseUrl } from '@/utils/env-utils';
import { get } from '@/utils/http-request';
import {
  IJSApiInfoData,
  IJSApiInfoParams,
  IUploadImageParams,
  IUserInfoRes,
} from './interface';

export const baseUrl = getBaseUrl();

/* 获取企业微信签名 */
export const getJsApiInfo = (params: IJSApiInfoParams) => {
  return get<IBaseResponse<IJSApiInfoData>>(
    `${baseUrl}/abi-cloud-ipeople/qyapi/weixin/signature`,
    params,
  );
};

/* 获取企业微信签名-for agentConfig */
export const getAgentSignature = (params: IJSApiInfoParams) => {
  return get<IBaseResponse<IJSApiInfoData>>(
    `${baseUrl}/abi-cloud-ipeople/qyapi/weixin/agent/signature`,
    params,
  );
};

/* 根据MediaId获取图片url */
export const uploadImageByMediaId = (params: IUploadImageParams) => {
  return get<IBaseResponse<string>>(
    `${baseUrl}/abi-cloud-ipeople/qyapi/weixin/imageUrl`,
    params,
  );
};

/* 获取用户信息 */
export const getUserInfo = () => {
  return get<IBaseResponse<IUserInfoRes>>(
    `${baseUrl}/abi-cloud-ipeople/user/qwei/profile`,
  );
};
