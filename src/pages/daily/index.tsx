import { TabBar } from 'antd-mobile';
import React, { useState } from 'react';
import styles from './index.less';
import Mngmt from './mngmt/index';
import Statistics from './statistics/index';
import View from './view/index';
import Write from './write/index';

const { Item } = TabBar;

const OssBaseUrl =
  'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/daily';

const TabResource = [
  {
    title: '看日报',
    key: 'View',
    icon: `${OssBaseUrl}/tab_view.svg`,
    selectedIcon: `${OssBaseUrl}/tab_view_s.svg`,
    content: <View />,
  },
  {
    title: '写日报',
    key: 'Write',
    icon: `${OssBaseUrl}/tab_write.svg`,
    selectedIcon: `${OssBaseUrl}/tab_write_s.svg`,
    content: <Write />,
  },
  {
    title: '统计',
    key: 'Statistics',
    icon: `${OssBaseUrl}/tab_statistics.svg`,
    selectedIcon: `${OssBaseUrl}/tab_statistics_s.svg`,
    content: <Statistics />,
  },
  {
    title: '设置',
    key: 'Mngmt',
    icon: `${OssBaseUrl}/tab_mngmt.svg`,
    selectedIcon: `${OssBaseUrl}/tab_mngmt_s.svg`,
    content: <Mngmt />,
  },
];

function Icon(props) {
  const { icon } = props;
  return (
    <div
      style={{
        width: '22px',
        height: '22px',
        background: `url(${icon}) center center /  21px 21px no-repeat`,
      }}
    />
  );
}

function Daily(props) {
  const [selectedTab, setSelectedTab] = useState('View');
  return (
    <div className={styles.container}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#c8102e"
        barTintColor="white"
        tabBarPosition="bottom"
      >
        {TabResource.map(({ title, key, icon, selectedIcon, content }) => (
          <Item
            title={title}
            key={key}
            selected={key === selectedTab}
            onPress={() => {
              setSelectedTab(key);
            }}
            icon={<Icon icon={icon} />}
            selectedIcon={<Icon icon={selectedIcon} />}
          >
            {content}
          </Item>
        ))}
      </TabBar>
    </div>
  );
}
export default Daily;
