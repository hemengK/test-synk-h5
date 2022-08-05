import contextManager from '@/context-manager/index';
import { ELANGUAGE, LANGUAGE } from '@/utils/constants';
import { TextareaItem } from 'antd-mobile';
import React, { Component } from 'react';
import styles from '../index.less';

class sendWord extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {
      global: { templateData, cardData },
    } = this.context;
    const { templateThanksUrl, templateEnThanksUrl } = templateData || {};
    let thanksUrl = templateThanksUrl;
    const { lang, comments } = cardData || {};
    const { getFieldProps } = this.props.form;
    if (lang === ELANGUAGE.EN) {
      thanksUrl = templateEnThanksUrl;
    }
    return (
      <div>
        <div className={styles.sendWord}>
          <img
            className={styles.bianKuang}
            src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/biankuang.png"
            alt=""
          />
          <div className={styles.editContent}>
            {lang && <p>{LANGUAGE[lang].words}</p>}
            <TextareaItem
              editable={false}
              style={{
                fontFamily: 'Helvetica',
                color: '#E7D6A6',
                width: '100%',
                marginTop: 10,
                height: 188,
                textAlign: 'center',
                fontSize: 14,
                // textAlign: 'justify',
                // hyphens: 'auto',
              }}
              {...getFieldProps('current', {
                initialValue: comments,
              })}
              rows={5}
            />
          </div>
        </div>
        <img className={styles.thanks} src={thanksUrl} alt="" />
      </div>
    );
  }
}
sendWord.contextType = contextManager;
export default sendWord;
