import { getUserInfo } from '@/api/wework';
import { IUserInfoRes } from '@/api/wework/interface';
import {
  getWorkbenchCategory,
  updateApplicationsInCategory,
} from '@/api/workbench';
import { IWorkbenchCategoryRes } from '@/api/workbench/interface';
import contextManager from '@/context-manager/index';
import useWxJsApiInfo from '@/hooks/wx-jsapi-info';
import { ELANGUAGE, WORKBENCH_IMAGE, WORKBENCH_LABEL } from '@/utils/constants';
import { ListView, SearchBar, Toast } from 'antd-mobile';
import React, { useContext, useEffect, useState } from 'react';
import Catagory from './components/catagory/index';
import UserInfo from './components/user/index';
import styles from './index.less';

function Workbench(props) {
  useWxJsApiInfo();

  const context = useContext(contextManager);
  const {
    global: {
      accessToken,
      language,
      favourites,
      setFavourites,
      setFavouriteLimit,
      setSearchVal,
    },
  } = context;

  const [dataSource, setDataSource] = useState<any>();
  const [allApps, setAllApps] = useState<Array<IWorkbenchCategoryRes>>();
  const [userInfo, setUserInfo] = useState<IUserInfoRes>();

  const {
    LABEL_SEARCH_PLACEHOLDER,
    LABEL_CANCEL,
    TIPS_NO_USER,
  } = WORKBENCH_LABEL[language];

  useEffect(() => {
    wx.ready(() => {
      wx.hideOptionMenu();
      wx.hideMenuItems({
        menuList: ['menuItem:refresh', 'menuItem:copyUrl'],
      });
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [accessToken]);

  const getRowData = (dataBlob, sectionID, rowID) => {
    return dataBlob[sectionID][rowID * 1];
  };

  const filterData = (data: Array<IWorkbenchCategoryRes>) => {
    let ds = new ListView.DataSource({
      getRowData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    ds = ds.cloneWithRows([...data]);
    return ds;
  };

  const customIcon = (tag = 1) => (
    <div>
      <div
        className={styles.error + ' ' + (tag === 1 ? styles.bg1 : styles.bg2)}
      ></div>
      <div style={{ padding: '0px 10px 10px 10px' }}>{TIPS_NO_USER}</div>
    </div>
  );

  const loadData = async () => {
    const { data: userInfo } = await getUserInfo();
    if (!userInfo?.employeeCode) {
      Toast.info(
        customIcon(1),
        2,
        () => {
          wx.closeWindow();
        },
        true,
      );
      return;
    }
    setUserInfo(userInfo);
    let { data } = await getWorkbenchCategory({
      employeeCode: userInfo!.employeeCode,
    });
    setAllApps(data);
    let ds = filterData(data!);
    setDataSource(ds);
    let fobj = data!.filter((i) => i.ename === 'Favourite')[0] || {
      list: [],
      maxApplicationAmount: 9,
    };
    let list = fobj.list;
    let limit = fobj.maxApplicationAmount;
    setFavourites(list);
    setFavouriteLimit(limit);
  };

  const onSearch = (val) => {
    val = val.toLocaleLowerCase();
    setSearchVal(val);
    if (val && val.length) {
      let tempAllApps = allApps!.reduce((acc, cur) => {
        let item = { ...cur };
        item.list = cur.list.filter(
          (sub) =>
            (sub.cname + sub.ename).toLocaleLowerCase().indexOf(val) !== -1,
        );
        if (item.list.length > 0 || item.ename === 'Favourite') {
          acc.push(item as never);
        }
        return acc;
      }, []);
      let ds = filterData(tempAllApps!);
      setDataSource(ds);
    } else {
      let ds = filterData(allApps!);
      setDataSource(ds);
    }
  };

  const onEditDone = async (categoryId, cb) => {
    let applicationRefList = favourites.reduce((acc, cur, idx) => {
      acc.push({ applicationId: cur.id, sequence: idx + 1 });
      return acc;
    }, []);
    let { code } = await updateApplicationsInCategory([
      {
        applicationRefList,
        categoryId,
      },
    ]);
    code === 200000 && cb && cb();
  };

  const renderRow = (rowData, sectionID, rowID) => {
    return (
      <Catagory
        rowID={rowID}
        rowData={rowData}
        sectionID={sectionID}
        onEditDone={onEditDone}
      />
    );
  };

  const renderSeparator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        height: '8px',
      }}
    />
  );

  const { BG_URL } = WORKBENCH_IMAGE;
  const { avatar, realName, realEnName, employeeCode } = userInfo || {};
  return (
    <div className={styles.wrapper}>
      {/* 头部背景 */}
      <img className={styles.bg} src={BG_URL}></img>
      {/* 用户信息 */}
      <UserInfo
        className={styles.user}
        avatar={avatar}
        name={
          language === ELANGUAGE.CN
            ? realName || realEnName
            : realEnName || realName
        }
        employeeCode={employeeCode}
      ></UserInfo>
      {/* 搜索 */}
      <SearchBar
        className={styles.search}
        disabled={false}
        placeholder={LABEL_SEARCH_PLACEHOLDER}
        cancelText={LABEL_CANCEL}
        onChange={onSearch}
      ></SearchBar>
      {/* 列表 */}
      {dataSource && (
        <ListView
          className={styles.catagories}
          dataSource={dataSource}
          renderRow={renderRow}
          useBodyScroll
          renderSeparator={renderSeparator}
        />
      )}
      {/* <ListView
        className={styles.catagories}
        dataSource={dataSource}
        renderRow={renderRow}
        useBodyScroll
        renderSeparator={renderSeparator}
      /> */}
    </div>
  );
}

export default Workbench;
