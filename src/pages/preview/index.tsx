import contextManager from '@/context-manager/index';
import { ELANGUAGE, LANGUAGE } from '@/utils/constants';
import { createForm } from 'rc-form';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import PlayMusicTip from './form/playMusicTip';
import PreviewBtn from './form/previewBtn';
import SendCard from './form/sendWord';
import styles from './index.less';

function PreviewPage(props) {
  const context = useContext(contextManager);
  const [uploadPhoto, setUploadPhoto] = useState<string>();

  const {
    global: { language, cardData, templateData, allData, imgSize, setImgSize },
  } = context;

  let {
    lang,
    realName,
    realEnName,
    commentIndex,
    enCommentIndex,
    imageUrl,
    years,
  } = cardData || {};
  const {
    templateThanksUrl,
    templateEnThanksUrl,
    comments,
    enComments,
    templateYearsUrl,
    templateEnYearsUrl,
    templateLogoUrl,
    logoMarginTop,
    templateUrl,
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
  let wordList = [...comments];
  let thanksUrl = templateThanksUrl;
  let yearUlr = templateYearsUrl;
  let iconLang =
    'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/en.png';
  let cIndex = commentIndex;
  if (lang === ELANGUAGE.EN) {
    wordList = [...enComments];
    thanksUrl = templateEnThanksUrl;
    yearUlr = templateEnYearsUrl;
    cIndex = enCommentIndex;
    iconLang =
      'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/cn.png';
  }
  if (!wordList) {
    wordList = [];
  }
  if (!imageUrl) {
    imageUrl = '';
  }

  useEffect(() => {
    wx.ready(() => {
      wx.hideOptionMenu();
      wx.hideMenuItems({
        menuList: [
          /* 'menuItem:setFont',  */ 'menuItem:refresh',
          'menuItem:copyUrl',
        ], // 要隐藏的菜单项
      });
    });
  }, []);

  const { form } = props;

  return useMemo(
    () => (
      <div className={styles.anniversary}>
        <div
          className={styles.content}
          style={{
            backgroundImage: `url(${templateUrl})`,
          }}
        >
          <PlayMusicTip />
          <img
            className={styles.pageLogo}
            src={templateLogoUrl}
            style={{ marginTop: `${logoMarginTop}px` }}
            alt=""
          />
          <p className={styles.setStaff}>
            {`${LANGUAGE[lang].staffInfo} ${
              lang == ELANGUAGE.CN ? realName : realEnName
            } ${LANGUAGE[lang].staffWife}`}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              className={styles.yearsImg}
              src={yearUlr}
              style={{ height: `${imgHeight}px` }}
              alt=""
            />
          </div>
          {/* 上传图片 */}
          {imageUrl.length > 4 ? (
            <img
              src={imageUrl}
              style={{
                width: imgSize && imgSize.w,
                height: imgSize && imgSize.h,
              }}
              alt=""
              className={styles.photo}
            />
          ) : (
            // <div className={styles.staffphoto}>

            // </div>
            ''
          )}
          <SendCard form={form} />
        </div>
        <PreviewBtn form={form} />
      </div>
    ),
    [language, allData, templateData],
  );
}

export default createForm()(PreviewPage);
