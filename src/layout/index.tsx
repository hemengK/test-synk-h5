import { userAuth } from '@/api/index';
import ContextManager from '@/context-manager/index';
import useEmergencyContact from '@/store/emergency-contact';
import useGlobalData from '@/store/global';
import useOnBoarding from '@/store/on-boarding';
import { ELANGUAGE } from '@/utils/constants';
import { RESPONSE_CODE } from '@/utils/http-contranst';
import { GetDefaultLang } from '@/utils/string-utils';
import { Toast } from 'antd-mobile';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { IRouteComponentProps } from 'umi';

function GlobalLayout(props: IRouteComponentProps) {
  const { children } = props;

  const global = useGlobalData();
  const emergency = useEmergencyContact();
  const boarding = useOnBoarding(global);

  const contextValue = {
    global,
    emergency,
    boarding,
  };

  const getAuth = async (code: string) => {
    const authRes: any = await userAuth(code);
    if (authRes.code === RESPONSE_CODE.SUCCESS_200000) {
      global.setAccessToken(authRes.access_token);
      Cookies.set('Authorization', 'bearer ' + authRes.access_token);
      Cookies.set('TokenTime', '' + Date.now());
    }
  };
  const configToken = () => {
    const { code } = props.location.query;
    if (code) {
      let tokenTime = Cookies.get('TokenTime');
      if (tokenTime) {
        tokenTime = parseInt(tokenTime);
        if (Date.now() - tokenTime < 3600 * 1000) {
          global.setAccessToken(Cookies.get('Authorization'));
          return;
        }
      }
      getAuth(code as string);
    } else {
      Toast.fail('请在企业微信中打开');
      // 本地调试
      if (
        window.location.origin.indexOf(':8000') !== -1 ||
        window.location.origin.indexOf('/macro') !== -1
      ) {
        Cookies.set(
          'Authorization',
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpd2hvbGVzYWxlclVzZXJJZCI6bnVsbCwiaXNGaXJzdExvZ2luIjpmYWxzZSwidXNlcl9uYW1lIjoiIiwicm9sZUlkIjoiIiwic2NvcGUiOlsiYWxsIl0sImFiaU9uZUlkIjoiODgwODIzNTIzNTgzNDYwMTg4IiwiYmVlc1VzZXJJZCI6bnVsbCwidXNlclR5cGUiOiJRX1dFSVhJTiIsImV4cCI6MTYzMzUxMDg5NSwianRpIjoiUGpRdjRjeWp2N0RzV3U0dGRuWks5WlVjWmJZIiwiY2xpZW50X2lkIjoiMmIwMWEzMTBlYWZkNDdmMWE4ZGQ0MWIxNGRhMGRkM2EifQ.f-X0l4o9eOWmNn8BGk4zblYXaKaBoiVbHZ4_A3hslgU',
        );
        global.setAccessToken(Cookies.get('Authorization'));
      }
    }
  };
  const configLang = () => {
    const lang = GetDefaultLang();
    if (lang.indexOf('zh') > -1) {
      global.setLanguage(ELANGUAGE.CN);
    } else {
      global.setLanguage(ELANGUAGE.EN);
    }
  };
  useEffect(() => {
    configToken();
    configLang();
  }, []);

  return (
    <ContextManager.Provider value={contextValue}>
      {children}
    </ContextManager.Provider>
  );
}

export default GlobalLayout;
