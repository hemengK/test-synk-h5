import { uploadImageByMediaId } from '@/api/wework';
import { RESPONSE_CODE } from '@/utils/http-contranst';
// import { uploadImage } from '@/api/basic-server';
// import { compressImageV2 } from '@/utils/image-utils';

/*
 * 调用wx的chooseImage，获取图片的localId
 * 用拿到的localId调用wx的getLocalImgData拿到图片的base64
 * 将图片的base64压缩并获得图片的Bolb
 * 将图片的Bolb上传服务器，获取图片的url，并callbakc
 */
function useWxChooseImage() {
  const wxChooseIamge = (callback) => {
    wx.ready(() => {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const localIds = res.localIds;
          // wx.getLocalImgData({
          //   localId: localIds[0],
          //   success: function (data) {
          //     const localData = data.localData;
          //     compressImageV2(localData, async (blobData) => {
          //       const result = await uploadImage(blobData as Blob);
          //       if (result.code) {
          //         callback(result.data);
          //       }
          //     });
          //   },
          // });
          wx.uploadImage({
            localId: localIds[0],
            isShowProgressTips: 1,
            success: async (res) => {
              var serverId = res.serverId;
              let imgRes = await uploadImageByMediaId({ mediaId: serverId });
              if (imgRes.code === RESPONSE_CODE.SUCCESS_200000 && imgRes.data) {
                callback(imgRes.data);
              }
            },
          });
        },
      });
    });
  };
  return wxChooseIamge;
}

export default useWxChooseImage;
