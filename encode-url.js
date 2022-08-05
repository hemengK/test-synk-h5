const redirectUri = encodeURIComponent(
  // 'http://ipeople.ab-inbev.cn/anniversary/h5/edit-card?lang=cn',
  // 'http://ipeople.ab-inbev.cn/anniversary/h5/bonus',
  'https://ipeople.ab-inbev.cn/anniversary/h5/workbench',
  // 'http://ipeople.ab-inbev.cn/anniversary/h5/staff-preview?id=65589',
  // 'http://ipeople.ab-inbev.cn/anniversary/h5/test',
);
// const corpId = 'ww966635ca8b2be0fb'; // for macro
const corpId = 'wx4f8a71b2c71d7cc9'; // for 百威空间
// const corpId = 'wx258d7629c89f70f2'; // for 优特

let ret = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=#wechat_redirect`;

console.log(ret);

// console.log('MMHH3   ', decodeURIComponent('%2F'));

/*

环境dev：
corpId: wx258d7629c89f70f2

《消息id》：消息idg
《语言》：cn or en

老板编辑
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx258d7629c89f70f2&redirect_uri=http%3A%2F%2Fipeople-dev.ab-inbev.cn%2Fanniversary%2Fh5%2Fedit-card%3Fid%3D《消息id》%26lang%3D《语言》&response_type=code&scope=snsapi_base&state=#wechat_redirect

员工查看
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx258d7629c89f70f2&redirect_uri=http%3A%2F%2Fipeople-dev.ab-inbev.cn%2Fanniversary%2Fh5%2Fstaff-preview%3Fid%3D《消息id》&response_type=code&scope=snsapi_base&state=#wechat_redirect


*/
