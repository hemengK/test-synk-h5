export interface IJSApiInfoParams {
  id: string;
  langTag?: string;
}

export interface ISubmitParams {
  id: string;
}

export interface TemplateListParams {
  years: number;
}

export interface EditMessageParams {
  comments: string;
  id: number;
  imageUrl: string;
  langTag: string;
  musicId: number;
  templateId: number;
}

export interface IJSApiInfoData {
  timeStamp: number;
  nonceStr: string;
  signature: string;
}
