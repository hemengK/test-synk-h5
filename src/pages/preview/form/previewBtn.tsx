import { EditMessage, submitMessage } from '@/api/userserver/index';
import contextManager from '@/context-manager/index';
import { RESPONSE_CODE } from '@/utils/http-contranst';
import { Button, Modal, Toast } from 'antd-mobile';
import React, { Component } from 'react';
import { history } from 'umi';
import styles from '../index.less';

class PreviewBtn extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
    };
  }
  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  saveCard = async (cb) => {
    const {
      global: { templateData, cardData, setCardData, cacheComments, musicData },
    } = this.context;
    const { id, lang, imageUrl, musicInfo } = cardData;
    if (!id) {
      return Toast.fail('无消息id');
    }
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const comments = values.current;
      const res = await EditMessage({
        comments: comments,
        id: id,
        imageUrl: imageUrl,
        langTag: lang,
        musicId: musicData && musicData.id,
        templateId: templateData && templateData.id,
      });
      if (res.code === 200 && cb) {
        cb();
      }
    });
  };

  /* 关闭弹框 */
  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };

  /* 点击提交按钮 */
  onClickSubmit = () => {
    this.saveCard(() => {
      this.setState({
        modal1: true,
      });
    });
  };

  /* 确认提交 */
  toStaffPage = async () => {
    const {
      global: { cardData },
    } = this.context;
    const { id } = cardData;
    const res = await submitMessage({
      id,
    });
    if (res.code === RESPONSE_CODE.SUCCESS) {
      this.setState({
        modal1: false,
        modal2: true,
      });
    }
  };

  toThankPage = () => {
    this.setState({
      modal2: false,
    });
    wx.closeWindow();
  };

  /* 返回 */
  toPreviewPage() {
    history.go(-1);
  }
  render() {
    return (
      <div className={styles.confirm}>
        <Button
          className={`${styles['buttonPreview']} ${styles['button']}`}
          onClick={this.toPreviewPage}
        >
          Back/返回
        </Button>
        <Button
          className={`${styles['buttonSubmit']} ${styles['button']}`}
          onClick={this.onClickSubmit}
        >
          Submit/提交
        </Button>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
        >
          <div className={styles.contentEdit}>
            <img
              className={styles.submitIcon}
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/wenhao.png"
              alt=""
            />
            <p className={`${styles.tipTitle} ${styles.tipEn}`}>
              After submission, employee will receive your wish at 12 am on his
              / her working anniversary. Submit?
            </p>
            <p className={`${styles.tipTitle} ${styles.tipCn}`}>
              提交后，贺卡祝福会在员工入职周年纪念日当天12点推送，是否确认提交？
            </p>
            <div className={styles.editConfirm}>
              <Button
                className={`${styles['buttonEdit']} ${styles['cancleBtn']}`}
                onClick={this.onClose('modal1')}
              >
                Cancel/取消
              </Button>
              <Button
                className={`${styles['buttonEdit']} ${styles['submitBtn']}`}
                onClick={this.toStaffPage}
              >
                Submit/确认
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          visible={this.state.modal2}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal2')}
        >
          <div className={styles.knowAlert}>
            <img
              className={styles.knowIcon}
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/tijiaowancheng.png"
              alt=""
            />
            <p className={styles.knowEn}>Submit completed</p>
            <p className={styles.knowCn}>提交完成</p>
            <Button className={styles.knowBtn} onClick={this.toThankPage}>
              OK/知道了
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

PreviewBtn.contextType = contextManager;
export default PreviewBtn;
