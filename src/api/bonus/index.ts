import { IBaseResponse } from '@/api/interface';
import { getBaseUrl } from '@/utils/env-utils';
import { get, post } from '@/utils/http-request';
import {
  IConfigDictsData,
  IKpiAchievementData,
  IUploadLogParams,
} from './interface';

export const baseUrl = getBaseUrl();

// 奖金计算的配置信息
export const getConfigDicts = () => {
  return get<IBaseResponse<IConfigDictsData>>(
    `${baseUrl}/abi-cloud-ipeople/bonus/dicts`,
    {},
  );
};
// 获取用户kpi信息
export const getKpiAchievement = () => {
  return get<IBaseResponse<IKpiAchievementData>>(
    `${baseUrl}/abi-cloud-ipeople/bonus/kpi-achievement`,
    {},
  );
};
// 上传计算日志
export const uploadLog = (data: IUploadLogParams) => {
  return post<IBaseResponse<IUploadLogParams>>(
    `${baseUrl}/abi-cloud-ipeople/bonus/calculate-log`,
    data,
  );
};
