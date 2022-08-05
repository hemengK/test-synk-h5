import { EditMessage, submitMessage } from '@/api/userserver/index';
import contextManager from '@/context-manager/index';
import { ELANGUAGE } from '@/utils/constants';
import { RESPONSE_CODE } from '@/utils/http-contranst';
import { Button, Modal, Toast } from 'antd-mobile';
import React, { Component } from 'react';
import { history } from 'umi';
import styles from '../index.less';

class SubmitBtn extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false,
      submitSuccess: false,
    };
  }

  saveCard = async (cb) => {
    const {
      global: { templateData, cardData, setCardData, cacheComments, musicData },
    } = this.context;
    const { id, lang, imageUrl, musicInfo } = cardData;
    if (!id) {
      return Toast.fail('无消息id');
    }
    cacheComments(this.props.form);
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      let { current } = values;
      if (!current) {
        current = 0;
      }
      const comments = values[`comments${current}`];
      setCardData((pre) => {
        if (lang === ELANGUAGE.EN) {
          return { ...pre, enCommentIndex: current, comments };
        }
        return { ...pre, commentIndex: current, comments };
      });
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
  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  /* 关闭弹框 */
  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };

  onDone = () => {
    this.setState({
      submitSuccess: false,
    });
    wx.closeWindow();
  };

  /* 点击预览按钮 */
  onClickPreview = () => {
    this.saveCard(() => {
      history.push('/preview');
    });
  };

  /* 点击提交按钮 */
  onClickSubmit = () => {
    this.saveCard(() => {
      this.setState({
        showConfirmModal: true,
      });
    });
  };

  /* 确认提交 */
  onConfirmSubmit = async () => {
    const {
      global: { cardData },
    } = this.context;
    const { id } = cardData;
    const res = await submitMessage({
      id,
    });
    if (res.code === RESPONSE_CODE.SUCCESS) {
      this.setState({
        showConfirmModal: false,
      });
      this.setState({
        submitSuccess: true,
      });
    }
  };

  render() {
    return (
      <div className={styles.confirm}>
        <Button
          className={`${styles['buttonPreview']} ${styles['button']}`}
          onClick={this.onClickPreview}
        >
          Preview/预览
        </Button>
        <Button
          className={`${styles['buttonSubmit']} ${styles['button']}`}
          onClick={this.onClickSubmit}
        >
          Submit/提交
        </Button>
        <Modal
          visible={this.state.showConfirmModal}
          transparent
          maskClosable={false}
          onClose={this.onClose('showConfirmModal')}
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
                onClick={this.onClose('showConfirmModal')}
              >
                Cancel/取消
              </Button>
              <Button
                className={`${styles['buttonEdit']} ${styles['submitBtn']}`}
                onClick={this.onConfirmSubmit}
              >
                Submit/确认
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          visible={this.state.submitSuccess}
          transparent
          maskClosable={false}
          onClose={this.onClose('submitSuccess')}
        >
          <div className={styles.knowAlert}>
            <img
              className={styles.knowIcon}
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/tijiaowancheng.png"
              alt=""
            />
            <p className={styles.knowEn}>Submit completed</p>
            <p className={styles.knowCn}>提交完成</p>
            <Button className={styles.knowBtn} onClick={this.onDone}>
              OK/知道了
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
SubmitBtn.contextType = contextManager;
export default SubmitBtn;
