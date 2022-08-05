import { getJsApiInfo } from '@/api/dingtalk';
import { IJSApiInfoData } from '@/api/dingtalk/interface';
import { AGENT_ID } from '@/utils/constants';
import { RESPONSE_CODE } from '@/utils/http-contranst';
import { useEffect, useState } from 'react';

function useJsApiInfo() {
  const [jsApiInfo, setJsApiInfo] = useState<IJSApiInfoData>();
  const initJsApiInfo = async () => {
    const res = await getJsApiInfo({
      agentId: AGENT_ID,
      url: window.location.href,
    });
    if (res.code === RESPONSE_CODE.SUCCESS_200000) {
      setJsApiInfo(res.data);
    }
  };

  useEffect(() => {
    initJsApiInfo();
  }, []);

  return [jsApiInfo];
}

export default useJsApiInfo;
