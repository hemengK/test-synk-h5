export const ELANGUAGE = {
  EN: 'EN',
  CN: 'CN',
};

// 周年庆 👇
export const TAB_VALUE = {
  ALL: 'all',
  WEEK: 'week',
  MONTH: 'month',
};

export const AGENT_ID = '1167395842';

const CN_LABEL = {
  chinese: '中文',
  English: '英文',
  staffInfo: '-尊敬的',
  staffWife: '祝您入职百威-',
  year: '周年',
  words: '老板寄语',
};

const EN_LABEL = {
  chinese: 'CN',
  English: 'EN',
  staffInfo: '-Dear',
  staffWife: ', blessings for joining Budweiser APAC for-',
  year: 'year',
  words: 'Words of Appreciation',
};

export const LANGUAGE = {
  [ELANGUAGE.EN]: EN_LABEL,
  [ELANGUAGE.CN]: CN_LABEL,
};

// 周年庆 end
// bouns 👇

const BonusOssBaseUrl =
  'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bonus';

const BONUS_EN_LABEL = {
  hi: 'Hi, ',
  employeeId: 'Employee ID: ',
  calculationFormula: 'Calculation Formula',
  grossBonus: 'Gross Bonus',
  bonusSimulator: 'Bonus Simulator',
  sizePie: 'Size of the Pie',
  entifyTarget: 'Entity Target',
  individualTarget: 'Individual Target',
  individualTargetDes: 'Weight x Achievement',
  input: 'Input',
  kpiName: 'KPI Name',
  weight: 'Weight',
  achievement: 'Achievement',
  monthlyBasePay: 'Monthly Base Pay',
  bonusBase: 'Bonus Base',
  targetBonus: 'Target Bonus',
  bonusBaseDes: 'Monthly Base Pay x 13',
  bandMultiplier: 'Band Multiplier',
  bandMultiplierDes: '% based on band as of Sept. 30th',
  calculationResults: 'Calculation Results',
  calculate: 'Calculate',
  statementCalculation: 'Calculation Details',
  iconLangUrl: `${BonusOssBaseUrl}/icon_change_lang_zh.png`,
  formulaUrl: `${BonusOssBaseUrl}/formula_en.png`,
  keyboardDone: 'Done',
  cny: 'CNY',
  statements: [
    '1.Gross Bonus = (Size of the Pie * 70% + Entity Target * 30%) * (Individual Target + Entity Target) / 2 * Bonus Base * Band Multiplier * Time Dedication Rate',
    '2.If individual target achievement is < 35%, SOP bonus is 0.',
    '3.Band Multiplier refer to bonus % cooresponding to band as of Sept. 30th',
    '4.For simulation purpose, SOP Bonus Time Dedication Rate is set as 100% here. If your actual SOP entitlement period is less than one year, SOP Bonus Time Dedication Rate will be applied according to bonus payout rules.',
    "5.This tool is provided to estimate employee's SOP gross bonus amount base on different achievement scenarios. Simulation result is not a guarantee of any final bonus calculation or entitlement.",
    '6.Please contact People team if have any questions.',
  ],
  noUserTips: `Sorry, We're unable to fetch user data, this page is unoperatable`,
  noKpiTips: 'Please complete Target Setting process with your Line Manager',
};
const BONUS_CN_LABEL = {
  hi: '您好, ',
  employeeId: '工号: ',
  calculationFormula: '计算公式',
  grossBonus: '奖金额(税前)',
  bonusSimulator: '奖金测算',
  sizePie: 'SOP奖金池',
  entifyTarget: '实体达成',
  individualTarget: '个人达成',
  individualTargetDes: '指标权重 x 达成',
  input: '请输入',
  kpiName: '指标名称',
  weight: '权重',
  achievement: '达成',
  monthlyBasePay: '月基本工资',
  bonusBase: '奖金基数',
  targetBonus: '目标奖金额',
  bonusBaseDes: '月基本工资 x 13',
  bandMultiplier: '奖金比例',
  bandMultiplierDes: '9月30日级别对应的年奖比例',
  calculationResults: '计算结果',
  calculate: '计 算',
  statementCalculation: '计算说明',
  iconLangUrl: `${BonusOssBaseUrl}/icon_change_lang_en.png`,
  formulaUrl: `${BonusOssBaseUrl}/formula_zh.png`,
  keyboardDone: '确定',
  cny: '人民币',
  statements: [
    '1.奖金额(税前) = (SOP奖金池*70% + 实体达成*30%) * (个人达成+实体达成) /2*奖金基数*奖金比例*在职时间系数',
    '2.若个人达成低于35%，则SOP年奖为0',
    '3.奖金比例为9月30日级别对应的比例数值',
    '4.享有SOP奖金时间系数在测算工具中默认按100%计算。如果你当年享有SOP奖金的时间不满一年，则根据奖金计算规则进行折算',
    '5. 本工具仅用于帮助员工模拟不同业绩达成下的SOP年奖金额，不代表最终的奖金发放情况',
    '6. 如有问题请联系人事团队',
  ],
  noUserTips: `抱歉，未成功获取到用户信息，无法操作`,
  noKpiTips: '请先与你的直线经理完成目标下达流程',
};

export const BONUS_LABEL = {
  [ELANGUAGE.EN]: BONUS_EN_LABEL,
  [ELANGUAGE.CN]: BONUS_CN_LABEL,
};

export const BONUS_ICON_URL = {
  BONUS_BG: `${BonusOssBaseUrl}/bg.png`,
  DEFAULT_AVATAR: `${BonusOssBaseUrl}/default_avatar.png`,
  ICON_COIN: `${BonusOssBaseUrl}/icon_coin.png`,
  BTN_DROP: `${BonusOssBaseUrl}/btn-drap.png`,
  ICON_CLOSE: `${BonusOssBaseUrl}/icon-close.png`,
};

// bouns end
// workbench 👇
let iconTag = 0;
export const ItemStatus = {
  ItemStatusAdd: iconTag++,
  ItemStatusDelete: iconTag++,
  ItemStatusExit: iconTag++,
};
const WORKBENCH_OSS_BASE_URL =
  'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/workbench';
const WORKBENCH_EN_LABEL = {
  LABEL_HI: 'Hi, ',
  LABEL_EMPLOYEE_ID: 'Employee ID: ',
  LABEL_ICON_LANG_URL: `${WORKBENCH_OSS_BASE_URL}/icon_change_lang_zh.png`,
  LABEL_SEARCH_PLACEHOLDER: 'Search application',
  LABEL_EDIT: 'Edit',
  LABEL_EDIT_DONE: 'OK',
  LABEL_CANCEL: 'Cancel',
  TIPS_LIMIT: 'Maximum items has been reached',
  TIPS_NO_USER: `Sorry, We're unable to fetch user data, this page is unoperatable`,
};
const WORKBENCH_CN_LABEL = {
  LABEL_HI: '您好, ',
  LABEL_EMPLOYEE_ID: '工号: ',
  LABEL_ICON_LANG_URL: `${WORKBENCH_OSS_BASE_URL}/icon_change_lang_en.png`,
  LABEL_SEARCH_PLACEHOLDER: '搜索应用',
  LABEL_EDIT: ' 编辑 ',
  LABEL_EDIT_DONE: ' 完成 ',
  LABEL_CANCEL: ' 取消 ',
  TIPS_LIMIT: '已超过最大添加数量',
  TIPS_NO_USER: `抱歉，未成功获取到用户信息，无法操作`,
};
export const WORKBENCH_LABEL = {
  [ELANGUAGE.EN]: WORKBENCH_EN_LABEL,
  [ELANGUAGE.CN]: WORKBENCH_CN_LABEL,
};
export const WORKBENCH_IMAGE = {
  BG_URL: `${WORKBENCH_OSS_BASE_URL}/bg.png`,
  ARROW_UP_URL: `${WORKBENCH_OSS_BASE_URL}/arrow-up.png`,
  ARROW_DOWN_URL: `${WORKBENCH_OSS_BASE_URL}/arrow-down.png`,
  ICON_ADD: `${WORKBENCH_OSS_BASE_URL}/icon_add.png`,
  ICON_DELETE: `${WORKBENCH_OSS_BASE_URL}/icon_delete.png`,
  ICON_EXIST: `${WORKBENCH_OSS_BASE_URL}/icon_exist.png`,
  DEFAULT_AVATAR: `${BonusOssBaseUrl}/default_avatar.png`,
};
// workbench end
