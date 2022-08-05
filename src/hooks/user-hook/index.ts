import { userAuth } from '@/api/index';
import { RESPONSE_CODE } from '@/utils/http-contranst';
import { useEffect, useState } from 'react';

function useUserHook(code: string): [string] {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (code) {
      const authRes: any = await userAuth(code);
      if (authRes.code === RESPONSE_CODE.SUCCESS_200000) {
        setAccessToken(authRes.access_token);
      }
    }
  };

  return [accessToken];
}

export default useUserHook;
