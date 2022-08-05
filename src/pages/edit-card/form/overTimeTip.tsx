import { Modal } from 'antd-mobile';
import React, { Component } from 'react';
import styles from '../index.less';

class OverTimeTip extends Component<any, any> {
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
    this.setState({
      [key]: false,
    });
    wx.closeWindow();
  };

  render() {
    return (
      <div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          // afterClose={() => { alert('afterClose'); }}
        >
          <div className={styles.overTimeTip}>
            <img
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/zu48936.png"
              alt=""
            />
            <p
              className={styles.overTipEn}
              style={{ width: '80%', margin: 'auto' }}
            >
              You have missed the system setting time for sending a wish.
            </p>
            <p
              className={styles.overTipCn}
              style={{ width: '80%', margin: '18px auto 0 auto' }}
            >
              您已错过为员工准备祝福的系统提交时间，无法再准备祝福。
            </p>
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

export default OverTimeTip;
