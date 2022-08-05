import contextManger from '@/context-manager/index';
import { AGENT_ID, CORPID_MAP } from '@/utils/constants';
import { dd, ddDetectFaceFullScreen } from '@/utils/dd-utils';
import { useContext, useEffect } from 'react';

function useDetectFace() {
  const context = useContext(contextManger);
  const { jsApiInfo } = context;

  useEffect(() => {
    if (jsApiInfo) {
      dd.config({
        agentId: AGENT_ID, // 必填，微应用ID
        corpId: CORPID_MAP[AGENT_ID], //必填，企业ID
        timeStamp: jsApiInfo.timeStamp, // 必填，生成签名的时间戳
        nonceStr: jsApiInfo.nonceStr, // 必填，生成签名的随机串
        signature: jsApiInfo.signature, // 必填，签名
        type: 0, //选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: ['biz.ATMBle.detectFace', 'biz.ATMBle.detectFaceFullScreen'],
      });
    }
  }, [jsApiInfo]);

  const detectFace = (callback?: (success: boolean) => void) => {
    dd.ready(() => {
      ddDetectFaceFullScreen({
        corpId: CORPID_MAP[AGENT_ID],
        userId: '060814011422552639',
        hasFace: true,
        needBeauty: true,
        needFacePose: true,
      }).then(
        (res) => {
          callback && callback(res.photoStatus === 1);
        },
        (err) => {
          callback && callback(false);
        },
      );
    });
  };

  return [detectFace];
}

export default useDetectFace;
