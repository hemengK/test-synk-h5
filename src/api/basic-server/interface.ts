export interface IJSApiInfoParams {
  agentId: string;
  url: string;
}

export interface IJSApiInfoData {
  timeStamp: number;
  nonceStr: string;
  signature: string;
}
