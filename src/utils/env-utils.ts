export const BASE_URL = {
  dev: 'https://abi-gateway-dev.ab-inbev.cn',
  test: 'https://abi-gateway-test.ab-inbev.cn',
  uat: 'https://abi-gateway-uat.ab-inbev.cn',
  prod: 'https://abi-gateway.ab-inbev.cn',
};
export const getBaseUrl = () => {
  return BASE_URL[process.env.env || 'prod'];
};

const AUTH_URL = {
  dev: 'https://auth-dev.ab-inbev.cn/oauth/token',
  test: 'https://auth-test.ab-inbev.cn/oauth/token',
  uat: 'https://auth-uat.ab-inbev.cn/oauth/token',
  prod: 'https://auth.ab-inbev.cn/oauth/token',
};
export const getAuthUrl = () => {
  return AUTH_URL[process.env.env || 'prod'];
};

/* 不同环境的应用id */
const AGENT_ID = {
  dev: '1000047',
  test: '1000136', // TODO: test环境的agentId
  uat: '1000129', // TODO: uat环境的agentId
  prod: '1000129', // 百威空间-入职纪念日
};
export const getAgentId = () => {
  return AGENT_ID[process.env.env || 'prod'];
};

/* 不同环境的应用id */
const CORP_ID = {
  dev: 'wx258d7629c89f70f2', // 'ww966635ca8b2be0fb', // dyzs
  test: 'wx4f8a71b2c71d7cc9', // TODO: test环境的agentId
  uat: 'wx4f8a71b2c71d7cc9', // TODO: uat环境的agentId
  prod: 'wx4f8a71b2c71d7cc9', // 百威空间-入职纪念日
};
export const getCorpId = () => {
  return CORP_ID[process.env.env || 'prod'];
};
