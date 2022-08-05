export interface IJSApiInfoParams {
  agentId: string;
  url: string;
}

export interface IJSApiInfoData {
  timestamp: number;
  nonceStr: string;
  signature: string;
}

export interface IUploadImageParams {
  mediaId: string;
}

/* 用户 */
export interface IUserInfoRes {
  abiOneId: number;
  avatar: string;
  email: string;
  employeeCode: string;
  managerEmpNo: string;
  managerName: string;
  onBoardDate: string;
  realEnName: string;
  realName: string;
  sex: number;
}
