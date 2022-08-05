import { Modal } from 'antd-mobile';
import React, { Component } from 'react';
import styles from '../index.less';

class PushBlessedTip extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      modal1: true,
      modal2: true,
    };
  }
  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };
  onClose = (key) => () => {
    wx.ready(() => {
      this.setState({
        [key]: false,
      });
      wx.closeWindow();
    });
  };

  render() {
    return (
      <div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
        >
          <div className={styles.pushTimeTip}>
            <img
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/dengpao.png"
              alt=""
            />
            <p className={styles.overTipEn}>Your wish has been sent!</p>
            <p className={styles.overTipCn}>您已经给他/她送过祝福啦!</p>
            <button
              className={styles.overTipBtn}
              onClick={this.onClose('modal1')}
            >
              OK/知道了
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PushBlessedTip;
