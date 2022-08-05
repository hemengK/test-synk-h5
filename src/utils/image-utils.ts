/**
 *
 * @param file 文件内容
 * @param callBack 输出回调
 * @param quality  压缩质量
 * @param type 输出文件类型
 * @param maxWidth
 * @param maxHeight
 * @param dataUrl
 * @param blob
 */
const compressImage = (
  file: File,
  callBack: (result?: string | Blob | null) => void,
  quality: number = 0.7,
  type: string = 'image/jpeg',
  maxWidth?: number,
  maxHeight?: number,
  dataUrl: boolean = true,
  blob: boolean = false,
) => {
  const img = new Image();
  img.onload = () => {
    // 图片原始尺寸
    var originWidth = img.width;
    var originHeight = img.height;
    // 目标尺寸
    var targetWidth = originWidth,
      targetHeight = originHeight;
    if (maxWidth && maxHeight) {
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context?.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context?.drawImage(img, 0, 0, targetWidth, targetHeight);
    if (dataUrl) {
      callBack(canvas.toDataURL(type, quality));
    }
    if (blob) {
      canvas.toBlob(
        (b) => {
          callBack(b);
        },
        type,
        quality,
      );
    }
  };
  var reader = new FileReader();
  reader.onload = (e) => {
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

export const compressImageV2 = (
  file: string,
  callBack: (result?: string | Blob | null) => void,
  quality: number = 0.7,
  type: string = 'image/jpeg',
  maxWidth?: number,
  maxHeight?: number,
  dataUrl: boolean = false,
  blob: boolean = true,
) => {
  const img = new Image();
  img.onload = () => {
    // 图片原始尺寸
    var originWidth = img.width;
    var originHeight = img.height;
    // 目标尺寸
    var targetWidth = originWidth,
      targetHeight = originHeight;
    if (maxWidth && maxHeight) {
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context?.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context?.drawImage(img, 0, 0, targetWidth, targetHeight);
    if (dataUrl) {
      callBack(canvas.toDataURL(type, quality));
    }
    if (blob) {
      canvas.toBlob(
        (b) => {
          callBack(b);
        },
        type,
        quality,
      );
    }
  };
  img.src = file;
};

export default compressImage;
