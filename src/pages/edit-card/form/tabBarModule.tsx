import contextManager from '@/context-manager/index';
import { ELANGUAGE, LANGUAGE } from '@/utils/constants';
import { Carousel, TextareaItem } from 'antd-mobile';
import React, { Component } from 'react';
import { history } from 'umi';
import styles from '../index.less';
import OverTimeTip from './overTimeTip';
import PushBlessedTip from './pushBlessedTip';
import UploadPhoto from './uploadPhoto';

class TabBarModule extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      displayOver: false,
      infoAllData: {},
      infoEnData: {},
      infoCnData: {},
      langTag: 'CN',
      templateId: 1,
    };
  }

  componentDidMount() {
    this.init();
    this.getStaffInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.getStaffInfo();
  }

  init = () => {
    const {
      global: { cardData },
    } = this.context;
    const { lang } = cardData || {};
  };

  toSetModule = () => {
    const {
      global: { cacheComments },
    } = this.context;
    cacheComments(this.props.form);
    history.push({
      pathname: '/select-board',
      query: { bgImage: this.props.bgImage },
    });
  };

  toSetMusic = () => {
    const {
      global: { cacheComments },
    } = this.context;
    cacheComments(this.props.form);
    history.push('/select-music');
  };

  getStaffInfo = () => {
    const { id } = this.props;
    const {
      global: { setLanguage, checked },
    } = this.context;
    const { cardData } = this.props || { data: {} };
    // const res = await getShowMessage({
    //   id,
    // });
    if (cardData && cardData.userStatus == 60010) {
      this.setState({
        display: 'block',
      });
    } else if (cardData && cardData.userStatus === 70001) {
      this.setState({
        displayOver: true,
      });
    }
    if (checked === false) {
      setLanguage(ELANGUAGE.CN);
      this.setState({
        staffName: cardData && cardData.realName,
      });
    } else {
      setLanguage(ELANGUAGE.EN);
      this.setState({
        staffName: cardData && cardData.realEnName,
      });
    }
  };

  switchLanguage = () => {
    const {
      global: { setCardData, templateData, cardData, cacheComments },
    } = this.context;
    cacheComments(this.props.form, 1);
    const { lang } = cardData;
    const { comments, enComments } = templateData;
    let wordList = comments;
    if (lang === ELANGUAGE.CN) {
      wordList = enComments;
    }

    // 切换语言
    setCardData((pre) => {
      let { lang } = pre;
      if (lang === ELANGUAGE.CN) {
        lang = ELANGUAGE.EN;
      } else {
        lang = ELANGUAGE.CN;
      }
      return { ...pre, lang, commentIndex: 0, enCommentIndex: 0 };
    });
    let temp = wordList.reduce((pre, current, index) => {
      return Object.assign({}, pre, { [`comments${index}`]: current });
    }, {});
    this.props.form.setFieldsValue({ current: 0, ...temp });
  };

  render() {
    const {
      global: { cardData, templateData },
    } = this.context;
    const {
      form: { getFieldProps },
    } = this.props;
    let { lang, realName, realEnName, commentIndex, enCommentIndex, years } =
      cardData || {};
    const {
      templateThanksUrl,
      templateEnThanksUrl,
      comments,
      enComments,
      templateYearsUrl,
      templateEnYearsUrl,
      templateLogoUrl,
      logoMarginTop,
    } = templateData || {};
    if (!lang) {
      lang = ELANGUAGE.CN;
    }

    let imgHeight = 376 / 2;
    if (years + '' === '25' || years + '' === '20') {
      imgHeight = 330 / 2;
    }
    const d = (window.screen.width * 1.0) / 375;
    imgHeight *= d;

    let wordList = comments;
    let thanksUrl = templateThanksUrl;
    let yearUlr = templateYearsUrl;
    let iconLang =
      'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/en.png';
    let cIndex = commentIndex;
    if (lang === ELANGUAGE.EN) {
      wordList = enComments;
      thanksUrl = templateEnThanksUrl;
      yearUlr = templateEnYearsUrl;
      cIndex = enCommentIndex;
      iconLang =
        'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/cn.png';
    }
    if (!wordList) {
      wordList = [];
    }
    return (
      <div className={styles.tabbarmodule}>
        <img
          className={styles.pageLogo}
          src={templateLogoUrl}
          style={{ marginTop: `${logoMarginTop}px` }}
          alt=""
        />
        <p className={styles.setStaff}>
          {`${LANGUAGE[lang].staffInfo} ${
            lang == ELANGUAGE.CN ? realName + ' ' : realEnName
          }${LANGUAGE[lang].staffWife}`}
        </p>
        <img
          className={styles.yearsImg}
          src={yearUlr}
          style={{
            height: `${imgHeight}px`,
          }}
          alt=""
        />
        <div className={styles.tabBar}>
          <dl onClick={this.switchLanguage}>
            <dt>
              <img src={iconLang} alt="" />
            </dt>
            <dd>
              <p>Language</p>
              <p>语言</p>
            </dd>
          </dl>
          <dl onClick={this.toSetModule}>
            <dt>
              <img
                src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/setmodule.png"
                alt=""
              />
            </dt>
            <dd>
              <p>Board</p>
              <p>选择模板</p>
            </dd>
          </dl>
          <dl onClick={this.toSetMusic}>
            <dt>
              <img
                src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/setmusic.png"
                alt=""
              />
            </dt>
            <dd>
              <p>Music</p>
              <p>选择音乐</p>
            </dd>
          </dl>
        </div>
        <UploadPhoto />
        <div className={styles.sendWord}>
          <img
            className={styles.bianKuang}
            src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/input_border.png"
            alt=""
          />
          <div className={styles.editContent}>
            <p>{LANGUAGE[lang].words}</p>
            {wordList.length && (
              <Carousel
                autoplay={false}
                infinite
                {...getFieldProps('current', {
                  valuePropName: 'selectedIndex',
                  trigger: 'afterChange',
                  initialValue: cIndex,
                })}
              >
                {wordList.map((val, index) => (
                  <a
                    key={val}
                    style={{
                      display: 'inline-block',
                      width: '100%',
                      overflow: 'scroll',
                      marginTop: 10,
                      height: 200,
                      background: '#0000',
                    }}
                  >
                    <TextareaItem
                      // rows={5}
                      style={{
                        fontFamily: 'Helvetica',
                        color: '#E7D6A6',
                        width: '100%',
                        height: '188px',
                        margin: 'auto',
                        textAlign: 'center',
                        background: '#0000',
                        fontSize: 14,
                        // textAlign: 'justify',
                        // hyphens: 'auto',
                      }}
                      {...getFieldProps(`comments${index}`, {
                        initialValue: val,
                      })}
                    />
                  </a>
                ))}
              </Carousel>
            )}
          </div>
        </div>
        <img className={styles.thanks} src={thanksUrl} alt="" />
        {this.state.display === 'block' ? <PushBlessedTip /> : ''}
        {this.state.displayOver === true ? <OverTimeTip /> : ''}
      </div>
    );
  }
}
TabBarModule.contextType = contextManager;
export default TabBarModule;
