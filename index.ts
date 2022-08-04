import { getAgentId, getAuthUrl } from '@/utils/env-utils';
import { get } from '@/utils/http-request';

const GRANT_TYPE = 'qwei_xin_free_login';
const CLIENT_ID = '2b01a310eafd47f1a8dd41b14da0dd3a';
const CLIENT =
  'eOCEY690UgvIl94W0G1bs4PNOD9J6Qaod3wM704HggMRFPJp9BZLLFUgQN3MLYQM';

const authUrl = getAuthUrl();

const agentId = getAgentId();
/**
 * 鉴权登录
 * @param code
 * @returns
 */
export const userAuth = (code: string) => {
  return get(authUrl, {
    // agent_id: agentId,
    code: code,
    grant_type: GRANT_TYPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT,
  });
};
