import { getAgentSignature, getJsApiInfo } from '@/api/wework';
import contextManager from '@/context-manager/index';
import { getAgentId, getCorpId } from '@/utils/env-utils';
import { useContext, useEffect, useState } from 'react';
import { RESPONSE_CODE } from './../../utils/http-contranst';

function useWxJsApiInfo() {
  const [wxJsApiInfo, setWxJsApiInfo] = useState();
  const context = useContext(contextManager);
  const {
    global: { accessToken },
  } = context;

  useEffect(() => {
    if (accessToken) {
      loadWxJsApiInfo();
    }
  }, [accessToken]);

  const loadWxJsApiInfo = async () => {
    const res = await getJsApiInfo({
      agentId: getAgentId(),
      url: window.location.href,
    });
    if (res.code === RESPONSE_CODE.SUCCESS_200000) {
      execWxConfig(res.data);
    }
  };

  const configAgentSignature = async () => {
    const res = await getAgentSignature({
      agentId: getAgentId(),
      url: window.location.href,
    });
    console.log('MMHH-getAgentSignature', res);
    if (res.code === RESPONSE_CODE.SUCCESS_200000) {
      const { timestamp, nonceStr, signature } = res.data!;
      wx.agentConfig({
        corpid: getCorpId(), // 必填，企业微信的corpID
        agentid: getAgentId(), // 必填，企业微信的应用id （e.g. 1000247）
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: ['launchMiniprogram'], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        success: function (res) {
          // 回调
          console.log('MMHH-agentConfig-success\n', res);
        },
        fail: function (res) {
          if (res.errMsg.indexOf('function not exist') > -1) {
            alert('版本过低请升级');
          }
          console.log('MMHH-agentConfig-fail\n', res.errMsg);
        },
      });
    }
  };

  const execWxConfig = (data) => {
    const { timestamp, nonceStr, signature } = data;
    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: getCorpId(), // 必填，企业微信的corpID
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: [
        'chooseImage',
        'getLocalImgData',
        'uploadImage',
        'hideOptionMenu',
        'hideMenuItems',
        'getSystemInfoSync',
        'invoke',
        'launchMiniprogram',
      ], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    });
    wx.ready(function () {
      configAgentSignature();
    });
  };

  return {
    wxJsApiInfo,
  };
}

export default useWxJsApiInfo;
