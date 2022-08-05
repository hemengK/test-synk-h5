import { IBaseResponse } from '@/api/interface';
import { post } from '@/utils/http-request';
import { IJSApiInfoData } from './interface';

export const baseUrl = process.env.baseUrl || 'https://abi-gateway.ab-inbev.cn'; //prod

/* 微信拿到的图片（Blob）直接上传到oss，获取图片链接 */
export const uploadImage = (data: Blob) => {
  const formData = new FormData();
  formData.append('uploadFile', data);
  return post<IBaseResponse<IJSApiInfoData>>(
    `${baseUrl}/basic-service/file-upload-oss`,
    formData,
    { 'content-type': 'multipart/form-data' },
  );
};
