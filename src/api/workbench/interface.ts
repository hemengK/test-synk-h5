/* 应用 */
export interface IApplicationRes {
  cname: string;
  ename: string;
  icon: string;
  /* 应用类型： 0-h5 1-微信小程序 */
  type: number;
  url: string;
  urlEn: string;
  sequence: number;
  id: number;
}

/* 应用 */
interface IApplicationRefListReq {
  applicationId: number;
  sequence: number;
}

/* 更新收藏 */
export interface IUpdateApplicationsReq {
  applicationRefList: IApplicationRefListReq[];
  categoryId: number;
}

/* 分类 */
export interface IWorkbenchCategoryRes {
  id: number;
  cname: string;
  ename: string;
  sequence: number;
  maxApplicationAmount: number;
  list: Array<IApplicationRes | any>;
}

/* 分类 */
export interface IWorkbenchCategoryReq {
  employeeCode: string;
}

/* 分类 */
export interface IWorkbenchRedirectUrlRes {
  applicationId: string;
  language: string; // cn  or  en
}
