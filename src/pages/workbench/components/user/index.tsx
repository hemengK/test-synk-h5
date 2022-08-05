import contextManager from '@/context-manager/index';
import { ELANGUAGE, WORKBENCH_IMAGE, WORKBENCH_LABEL } from '@/utils/constants';
import React, { useContext, useEffect } from 'react';
import styles from './index.less';

function UserInfo(props) {
  const context = useContext(contextManager);
  const {
    global: { language, setLanguage },
  } = context;

  const onChangeLang = () => {
    setLanguage((prev) =>
      prev === ELANGUAGE.CN ? ELANGUAGE.EN : ELANGUAGE.CN,
    );
  };

  useEffect(() => {
    // 根据系统语言设置初始化语言
    var lang = navigator.language;
    lang = lang.substr(0, 2);
    if (lang === 'zh') {
      setLanguage(ELANGUAGE.CN);
    } else {
      setLanguage(ELANGUAGE.EN);
    }
  }, []);

  const { avatar, name, employeeCode, className } = props || {};
  const { LABEL_HI, LABEL_EMPLOYEE_ID, LABEL_ICON_LANG_URL } =
    WORKBENCH_LABEL[language] || {};
  const { DEFAULT_AVATAR } = WORKBENCH_IMAGE;
  return (
    <div className={`${styles.user} ${className}`}>
      <img src={avatar || DEFAULT_AVATAR} className={styles.avatar} />
      <div className={styles.info}>
        {/* 姓名 */}
        <div className={styles.name}>
          {LABEL_HI}
          {name}
        </div>
        {/* 工号 */}
        <div className={styles.no}>
          {LABEL_EMPLOYEE_ID}
          {employeeCode}
        </div>
      </div>
      {/* 切换语言 */}
      <div className={styles.lang} onClick={onChangeLang}>
        <img src={LABEL_ICON_LANG_URL} />
      </div>
    </div>
  );
}
export default UserInfo;
