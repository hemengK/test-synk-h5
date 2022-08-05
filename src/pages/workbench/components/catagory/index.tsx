import { getRedirectUrl } from '@/api/workbench';
import contextManager from '@/context-manager/index';
import {
  ELANGUAGE,
  ItemStatus,
  WORKBENCH_IMAGE,
  WORKBENCH_LABEL,
} from '@/utils/constants';
import { Button, Grid, Toast } from 'antd-mobile';
import React, { useContext, useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

function Item(props) {
  const { icon, name, status, edit, onEditItem, data, onClick } = props;
  const { ICON_ADD, ICON_DELETE, ICON_EXIST } = WORKBENCH_IMAGE;

  const onEdit = () => {
    status !== ItemStatus.ItemStatusExit && onEditItem(data, status);
  };

  const onClickItem = () => {
    !edit && onClick(data);
  };

  return (
    <div className={styles.item} onClick={onClickItem}>
      <img src={icon} className={styles.img} alt="" />
      {edit && (
        <img
          className={styles.icon}
          src={
            status === ItemStatus.ItemStatusAdd
              ? ICON_ADD
              : status === ItemStatus.ItemStatusDelete
              ? ICON_DELETE
              : ICON_EXIST
          }
          onClick={onEdit}
        />
      )}
      <div className={styles.name}>{name}</div>
    </div>
  );
}

function Catagory(props) {
  const { rowID, rowData, onEditDone } = props;
  const { ename, cname, id: categoryId } = rowData || {};

  const isFavourite = ename === 'Favourite';
  const isRecommended = ename === 'Recommended';

  const {
    global: {
      language,
      edit,
      setEdit,
      favourites,
      setFavourites,
      favouriteLimit,
      searchVal,
    },
  } = useContext(contextManager);

  const { LABEL_EDIT, LABEL_EDIT_DONE, TIPS_LIMIT } = WORKBENCH_LABEL[language];
  const { ARROW_UP_URL } = WORKBENCH_IMAGE;

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen((prev) => edit || prev);
  }, [edit]);

  const onChangeOpen = () => {
    setOpen((prev) => !prev);
  };

  const onEditOrDone = () => {
    if (!edit) {
      setEdit(true);
    } else {
      onEditDone(categoryId, () => {
        setEdit(false);
      });
    }
  };

  const customIcon = () => (
    <div>
      <div className={styles.error}></div>
      <div style={{ padding: '0px 10px 10px 10px' }}>{TIPS_LIMIT}</div>
    </div>
  );

  const onEditItem = (item, status) => {
    if (
      favourites.length >= favouriteLimit &&
      status === ItemStatus.ItemStatusAdd &&
      favouriteLimit !== -1
    ) {
      Toast.info(customIcon(), 2, () => {}, true);
      return;
    }
    setFavourites((prev) => {
      let old = [...prev];
      if (status === ItemStatus.ItemStatusAdd) {
        old = [...old, item];
      } else {
        old = old.filter((i) => i.ename != item.ename);
      }
      return old;
    });
  };

  const showChinese = language === ELANGUAGE.CN;

  const onClick = async ({ type, url, id, urlEn }) => {
    let targetUrl = showChinese ? url : urlEn;
    switch (type) {
      case 0 /* 外部h5应用 */:
        window.location.href = targetUrl;
        break;
      case 1 /*  小程序 */:
        wx.invoke(
          'launchMiniprogram',
          {
            appid: JSON.parse(targetUrl).appId, // 需跳转的小程序appid
          },
          function (res) {
            if (res.err_msg == 'launchMiniprogram:ok') {
              // 正常
            } else {
              // 错误处理
              console.log('MMHH', res);
            }
          },
        );
        break;
      case 2 /* 内部应用 */:
        history.push(targetUrl);
        break;
      case 3 /* 内部应用 */:
        let res = await getRedirectUrl({
          applicationId: id,
          language: showChinese ? 'cn' : 'en',
        });
        let tr = res.data as string;
        window.location.href = tr;
        break;
      default:
        break;
    }
  };

  const renderItem = (data) => {
    const { icon, cname, ename } = data || {};
    let itemStatus = ItemStatus.ItemStatusAdd;
    if (isFavourite) {
      itemStatus = ItemStatus.ItemStatusDelete;
    } else {
      if (favourites.filter((i) => i.ename === ename).length === 0) {
        itemStatus = ItemStatus.ItemStatusAdd;
      } else {
        itemStatus = ItemStatus.ItemStatusExit;
      }
    }
    return (
      <Item
        icon={icon}
        data={data}
        name={showChinese ? cname : ename}
        status={itemStatus}
        edit={edit}
        onEditItem={onEditItem}
        onClick={onClick}
      />
    );
  };

  let fs = favourites.filter(
    (sub) =>
      (sub.cname + sub.ename).toLocaleLowerCase().indexOf(searchVal) !== -1,
  );

  return !(isRecommended && edit) ? (
    <div
      key={rowID}
      className={`${styles.catagory} ${
        edit && isFavourite ? styles.editFavourite : ''
      }`}
    >
      <div className={styles.header}>
        <div className={styles.title}>{showChinese ? cname : ename}</div>
        {isFavourite ? (
          <Button
            className={`${styles.editBtn} ${edit ? styles.done : ''}`}
            onClick={onEditOrDone}
          >
            {edit ? LABEL_EDIT_DONE : LABEL_EDIT}
          </Button>
        ) : !isRecommended ? (
          <div className={styles.arrow} onClick={onChangeOpen}>
            <img
              src={ARROW_UP_URL}
              className={open || edit ? styles.up : styles.down}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <Grid
        className={`${open ? styles.open : styles.close}`}
        data={isFavourite ? fs : rowData.list}
        columnNum={3}
        renderItem={renderItem}
        square={false}
        hasLine={false}
      />
    </div>
  ) : (
    <div></div>
  );
}
export default Catagory;
