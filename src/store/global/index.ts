import { ELANGUAGE } from '@/utils/constants';
import { useState } from 'react';

function useGlobalData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allData, setAllData] = useState<Record<string, any>>();
  const [checked, setChecked] = useState<boolean>();
  const [edit, setEdit] = useState<boolean>(false);
  const [musicData, setMusicData] = useState<Record<string, any>>();

  const [accessToken, setAccessToken] = useState<string>('');
  const [language, setLanguage] = useState<string>(ELANGUAGE.CN);
  const [templateData, setTemplateData] = useState<Record<string, any>>();
  const [cardData, setCardData] = useState<Record<string, any>>(); // 贺卡信息
  const [imgSize, setImgSize] = useState<object>(); // 图片尺寸

  const [favourites, setFavourites] = useState<Array<any>>([]);
  const [favouriteLimit, setFavouriteLimit] = useState<number>(0);
  const [searchVal, setSearchVal] = useState<string>('');

  const cacheComments = (form, isReset) => {
    if (!cardData || !templateData) {
      return;
    }
    let { comments, enComments } = templateData || {};
    if (cardData.lang === ELANGUAGE.CN) {
      let comments2 = comments.map((element, idx) =>
        form.getFieldValue(`comments${idx}`),
      );
      setTemplateData((pre) => ({ ...pre, comments: comments2 }));
      setCardData((pre) => ({
        ...pre,
        commentIndex: isReset ? 0 : form.getFieldValue('current'),
      }));
    } else {
      let comments2 = enComments.map((element, idx) =>
        form.getFieldValue(`comments${idx}`),
      );
      setTemplateData((pre) => ({ ...pre, enComments: comments2 }));
      setCardData((pre) => ({
        ...pre,
        enCommentIndex: isReset ? 1 : form.getFieldValue('current'),
      }));
    }
  };

  return {
    searchVal,
    setSearchVal,
    language,
    setLanguage,
    edit,
    setEdit,
    favourites,
    setFavourites,
    favouriteLimit,
    setFavouriteLimit,
    loading,
    setLoading,
    templateData,
    setTemplateData,
    musicData,
    setMusicData,
    accessToken,
    setAccessToken,
    allData,
    setAllData,
    checked,
    setChecked,
    cardData,
    setCardData,
    cacheComments,
    imgSize,
    setImgSize,
  };
}

export default useGlobalData;
