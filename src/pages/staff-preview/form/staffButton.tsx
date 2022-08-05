import { staffThanks } from '@/api/userserver/index';
import contextManager from '@/context-manager/index';
import { RESPONSE_CODE } from '@/utils/http-contranst';
import { Button, Modal } from 'antd-mobile';
import React, { Component } from 'react';
import styles from '../index.less';

class StaffButton extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      flag: false,
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
  };

  toStaffPage = () => {
    this.setState({
      modal1: false,
      modal2: true,
    });
  };
  knowBtn = () => {
    this.setState({
      modal1: false,
      flag: true,
    });
  };

  toPreviewPage() {
    wx.closeWindow();
  }

  staff = async () => {
    const res = await staffThanks({
      id: this.props.id as string,
    });
    if (res.code === RESPONSE_CODE.SUCCESS) {
    }
  };

  staffThank = () => {
    this.setState({
      modal1: true,
    });
    this.staff();
  };

  render() {
    const {
      global: { cardData, setCardData },
    } = this.context;
    return (
      <div className={styles.confirm}>
        <Button
          className={`${styles['buttonPreview']} ${styles['button']}`}
          onClick={this.toPreviewPage}
        >
          Close/关闭
        </Button>
        <Button
          className={`${styles['buttonSubmit']} ${styles['button']}`}
          onClick={this.staffThank}
          disabled={
            this.state.flag ||
            (cardData && cardData.sendStatus == '0' ? false : true)
          }
        >
          Thanks/答谢
        </Button>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
        >
          <div className={styles.staffContent}>
            <img
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/xinfeng.png"
              alt=""
            />
            <p>Your thanks has been sent!</p>
            <p style={{ fontWeight: 400 }}>您的感谢已发送。</p>
            <Button className={styles.staffKnow} onClick={this.knowBtn}>
              OK/知道了
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
StaffButton.contextType = contextManager;
export default StaffButton;
