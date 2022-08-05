import { staffMessage } from '@/api/userserver/index';
import contextManager from '@/context-manager/index';
import useWxJsApiInfo from '@/hooks/wx-jsapi-info';
import { LANGUAGE } from '@/utils/constants';
import { createForm } from 'rc-form';
import React, { useContext, useEffect, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import { RESPONSE_CODE } from './../../utils/http-contranst';
import StaffButton from './form/staffButton';
import styles from './index.less';

interface IOnBoardingProps extends IRouteComponentProps {
  form: Record<string, any>;
}
function StaffPage(props: IOnBoardingProps) {
  useWxJsApiInfo();
  const context = useContext(contextManager);
  const [musicChoose, setMusicChoose] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [musicLogo, setMusicLogo] = useState<string>(
    'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bubomusic.png',
  );
  const {
    global: {
      accessToken,
      language,
      setLanguage,
      cardData,
      setCardData,
      setMusicData,
      musicData,
    },
  } = context;
  let { years } = cardData || {};
  let imgHeight = 376 / 2;
  if (years + '' === '25' || years + '' === '20') {
    imgHeight = 330 / 2;
  }
  const d = (window.screen.width * 1.0) / 375;
  imgHeight *= d;

  const {
    location: {
      query: { id },
    },
  } = props;

  const getCardData = async () => {
    if (!cardData) {
      const res = await staffMessage({
        id: id as string,
      });
      if (res.code === RESPONSE_CODE.SUCCESS && res.data) {
        setCardData({ ...res.data });
        if (res.data.langTag == 'EN') {
          setLanguage('EN');
        } else {
          setLanguage('CN');
        }
        if (res.data && res.data.musicInfo) {
          setMusicData({
            ...res.data.musicInfo,
            id: res.data.musicInfo.musicId,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      getCardData();
    }
  }, [accessToken]);

  useEffect(() => {
    wx.ready(() => {
      wx.hideOptionMenu();
      wx.hideMenuItems({
        menuList: [
          /* 'menuItem:setFont', */ 'menuItem:refresh',
          'menuItem:copyUrl',
        ], // 要隐藏的菜单项
      });
    });
  }, []);

  const switchMusic = () => {
    setMusicChoose(!musicChoose);
    if (musicChoose == false) {
      setMusicLogo(
        'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bofangmusic.png',
      );
    } else {
      setMusicLogo(
        'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bubomusic.png',
      );
    }
  };

  const filePhoto = (e) => {
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

    setWidth(w);
    setHeight(h);
  };

  return (
    <div className={styles.anniversary}>
      <div
        className={styles.content}
        style={{
          backgroundImage: `url(${
            cardData && cardData.peopleTemplateInfo.templateUrl
          })`,
        }}
      >
        <div>
          {cardData && cardData.musicInfo.id == 1 ? (
            ''
          ) : (
            <img
              className={styles.musicIcon}
              src={musicLogo}
              alt=""
              onClick={switchMusic}
            />
          )}
          {musicChoose === true ? (
            <div className={styles.PlayMusicTip}>
              <audio
                autoPlay
                loop={true}
                src={cardData && cardData.musicInfo.musicUrl}
              ></audio>
              <img
                className={styles.tipLogo}
                src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/yinle@2x.png"
                alt=""
              />
              <span>{cardData && cardData.musicInfo.title}</span>
            </div>
          ) : (
            <div
              style={{ background: 'transparent' }}
              className={styles.PlayMusicTip}
            ></div>
          )}
        </div>
        <img
          className={styles.pageLogo}
          src={cardData && cardData.peopleTemplateInfo.templateLogoUrl}
          alt=""
        />
        <p className={styles.setStaff}>
          {LANGUAGE[language].staffInfo}{' '}
          {cardData && cardData.langTag == 'CN'
            ? cardData && cardData.realName
            : cardData && cardData.realEnName}{' '}
          {LANGUAGE[language].staffWife}
        </p>
        <img
          className={styles.yearsImg}
          src={
            cardData && cardData.langTag == 'CN'
              ? cardData && cardData.peopleTemplateInfo.templateYearsUrl
              : cardData && cardData.peopleTemplateInfo.templateEnYearsUrl
          }
          style={{
            height: `${imgHeight}px`,
          }}
          alt=""
        />
        {/* 上传图片 */}
        {cardData && cardData.imageUrl ? (
          <img
            src={cardData && cardData.imageUrl}
            onLoad={filePhoto}
            style={{ width: width, height: height }}
            alt=""
            className={styles.photo}
          />
        ) : (
          // <div className={styles.staffphoto}>
          // </div>
          ''
        )}
        <div className={styles.sendWord}>
          <div className={styles.editContent}>
            <span>{LANGUAGE[language].words}</span>
            <p>{cardData && cardData.comments}</p>
          </div>
          <img
            className={styles.bianKuang}
            src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/biankuang.png"
            alt=""
          />
        </div>
        <img
          className={styles.thanks}
          src={
            cardData && cardData.langTag == 'CN'
              ? cardData && cardData.peopleTemplateInfo.templateThanksUrl
              : cardData && cardData.peopleTemplateInfo.templateEnThanksUrl
          }
          alt=""
        />
      </div>
      <StaffButton id={id} />
    </div>
  );
}

export default createForm()(StaffPage);
