export interface IUploadLogParams {
  calculateLog: string;
}

interface IBonusBaseItem {
  band: string;
  bonusBase: number;
  bonusRat: number;
  id: number;
}
interface IAchievementRatItem {
  achievementRat: number;
  id: number;
}
export interface IConfigDictsData {
  bandBonusBaseDict: Array<IBonusBaseItem>;
  kpiAchievementRatDict: Array<IAchievementRatItem>;
}

export interface IAchievementItem {
  achievement: string | null;
  kpiName: string;
  weight: string | null;
}
export interface IKpiAchievementData {
  band: string;
  employeeCode: string;
  cname: string;
  ename: string;
  avatar: string;
  kpiAchievementList: Array<IAchievementItem>;
}
