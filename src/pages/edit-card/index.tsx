import { getModuleInfo, getShowMessage } from '@/api/userserver/index';
import contextManager from '@/context-manager/index';
import useWxJsApiInfo from '@/hooks/wx-jsapi-info';
import { createForm } from 'rc-form';
import React, { useContext, useEffect, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import { RESPONSE_CODE } from './../../utils/http-contranst';
import EditMusicTip from './form/editMusicTip';
// import OverTimeTip from './form/overTimeTip';
// import PushBlessedTip from './form/pushBlessedTip';
import ButtonsEdit from './form/submitBtn';
import TabBarModule from './form/tabBarModule';
import styles from './index.less';

interface IOnBoardingProps extends IRouteComponentProps {
  form: Record<string, any>;
}
function EditPage(props: IOnBoardingProps) {
  useWxJsApiInfo();

  const [bgImage, setBgImage] = useState<string>();
  const [switchMusic, setSwitchMusic] = useState<string>();
  const context = useContext(contextManager);
  const {
    global: {
      accessToken,
      musicData,
      setMusicData,
      templateData,
      setTemplateData,
      cardData,
      setCardData,
    },
  } = context;
  let {
    form,
    location: {
      query: { id, lang },
    },
  } = props;
  const getImage = (data) => {
    setBgImage(data);
  };

  const getCardData = async () => {
    if (!cardData) {
      const res = await getShowMessage({
        id: id as string,
      });
      if (res.code === RESPONSE_CODE.SUCCESS) {
        if (!lang) {
          lang = 'CN';
        }
        setCardData({
          ...res.data,
          lang: (lang as string).toUpperCase(),
          commentIndex: 0,
          enCommentIndex: 0,
        });
        if (res.data && res.data.musicInfo) {
          setMusicData({
            ...res.data.musicInfo,
            id: res.data.musicInfo.musicId,
          });
        }
        getTemplateData(res.data.templateId);
      }
    }
  };

  const getTemplateData = async (tid) => {
    if (!templateData) {
      const res = await getModuleInfo({ id: tid });
      if (res.code === RESPONSE_CODE.SUCCESS) {
        setTemplateData(res.data);
      }
    }
  };

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

  /* 获取token之后请求贺卡数据 */
  useEffect(() => {
    if (accessToken) {
      getCardData();
    }
  }, [accessToken]);

  return (
    <div className={styles.anniversary}>
      {/* <div className={styles.bgImages}>
        <img src={templateUrl} alt="" className={styles.bgImage} />
      </div> */}
      <audio autoPlay loop={true} src={musicData && musicData.musicUrl}></audio>
      <div
        className={styles.content}
        style={{
          backgroundImage: `url(${templateData && templateData.templateUrl})`,
        }}
      >
        <EditMusicTip />
        <TabBarModule
          form={form}
          id={id}
          bgImage={bgImage}
          cardData={cardData}
          getImage={getImage}
        />
        {/* <OverTimeTip /> */}
        {/* <PushBlessedTip /> */}
      </div>
      <ButtonsEdit form={form} />
    </div>
  );
}

export default createForm()(EditPage);
