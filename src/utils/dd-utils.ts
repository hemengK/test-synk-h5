import ddDetectFace from 'dingtalk-jsapi/api/biz/ATMBle/detectFace';
import ddDetectFaceFullScreen from 'dingtalk-jsapi/api/biz/ATMBle/detectFaceFullScreen';
import ddOpenLink from 'dingtalk-jsapi/api/biz/util/openLink';
import ddRequestAuthCode from 'dingtalk-jsapi/api/runtime/permission/requestAuthCode';
import dd from 'dingtalk-jsapi/dd';
import 'dingtalk-jsapi/entry/mobile';

// dd.config({
//   agentId: '', // 必填，微应用ID
//   corpId: '', //必填，企业ID
//   timeStamp: '', // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '', // 必填，签名
//   type: 0, //选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
//   jsApiList: ['biz.ATMBle.detectFace'],
// });

export {
  ddDetectFace,
  ddRequestAuthCode,
  ddOpenLink,
  dd,
  ddDetectFaceFullScreen,
};
