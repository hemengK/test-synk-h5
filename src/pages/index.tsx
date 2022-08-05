import useWxChooseImage from '@/hooks/wx-choose-image';
import useWxJsApiInfo from '@/hooks/wx-jsapi-info';
import { getCorpId } from '@/utils/env-utils';
import React, { useEffect } from 'react';
import { IRouteComponentProps } from 'umi';

function test(props: IRouteComponentProps) {
  useWxJsApiInfo();
  const wxChooseImage = useWxChooseImage();
  setTimeout(() => {
    wxChooseImage((imgUrl) => {
      console.log('wxChooseImage', imgUrl);
    });
  }, 2000);

  useEffect(() => {
    const { code } = props.location.query;
    if (!code) {
      const redirectUri = encodeURIComponent(location.href);
      const corpId = getCorpId();
      location.replace(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=#wechat_redirect`,
      );
    }
  }, []);

  return <div>{`test ${JSON.stringify(props.location)}`}</div>;
}

export default test;
