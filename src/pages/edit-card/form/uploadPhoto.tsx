import deleteIcon from '@/assest/icon-delete.png';
import contextManager from '@/context-manager/index';
import useWxChooseImage from '@/hooks/wx-choose-image';
import React, { Component } from 'react';
import styles from '../index.less';

class uploadPhoto extends Component<any, any> {
  wxChooseImage = useWxChooseImage();
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: undefined,
      width: 0,
      height: 0,
      // photoUrl:
      //   'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.xspic.com%2Fimg8%2F14%2F55%2F2438926_1.jpg&refer=http%3A%2F%2Fimg.xspic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624068290&t=277ae89d069044ae3d6132ad0ed6cb13',
    };
  }

  componentDidMount() {}

  uploadPhoto = () => {
    const {
      global: { setCardData },
    } = this.context;
    this.wxChooseImage((url) => {
      this.setState({ photoUrl: url });
      setCardData((pre) => ({ ...pre, imageUrl: url }));
    });
  };
  deletePhoto = () => {
    const {
      global: { setCardData },
    } = this.context;
    this.setState({ photoUrl: undefined });
    setCardData((pre) => ({ ...pre, imageUrl: '' }));
  };
  filePhoto = (e) => {
    const {
      global: { imgSize, setImgSize },
    } = this.context;
    let imgW = e.currentTarget.naturalWidth;
    let imgH = e.currentTarget.naturalHeight;
    let maxH = 350,
      h = 350;
    let maxW = 280,
      w = 280;

    let tempW = (maxW / maxH) * imgH; // 宽
    let tempH = (maxH / maxW) * imgW; // 高

    const delta = window.screen.width / 375;

    if (tempH / tempW > maxH / maxW) {
      h = (imgH / imgW) * maxW * delta;
    }
    if (tempW / tempH > maxW / maxH) {
      w = (imgW / imgH) * maxH * delta;
    }

    this.setState({
      width: w,
      height: h,
    });
    setImgSize({ w, h });
  };

  render() {
    const {
      global: { cardData },
    } = this.context;
    const { imageUrl } = cardData || {};
    return (
      <div className={styles.uploadPhoto}>
        {!imageUrl ? (
          <img
            src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/icon-upload.png"
            alt=""
            onClick={this.uploadPhoto}
          />
        ) : (
          <div className={styles.photoType}>
            <img
              style={{ width: this.state.width, height: this.state.height }}
              src={imageUrl}
              // src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1114%2F0FR0104017%2F200FQ04017-6-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624625208&t=22e32e34eadc08d849615fa450f00c86"
              // src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.xspic.com%2Fimg8%2F14%2F55%2F2438926_1.jpg&refer=http%3A%2F%2Fimg.xspic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624068290&t=277ae89d069044ae3d6132ad0ed6cb13'
              alt=""
              onLoad={this.filePhoto}
            />
            <div onClick={this.deletePhoto} style={{ width: this.state.width }}>
              <img className={styles.deleteIcon} src={deleteIcon} alt="" />
              <p>删除照片</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
uploadPhoto.contextType = contextManager;
export default uploadPhoto;
