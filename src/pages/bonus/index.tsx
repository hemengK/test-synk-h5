import { getConfigDicts, getKpiAchievement, uploadLog } from '@/api/bonus';
import { IAchievementItem, IKpiAchievementData } from '@/api/bonus/interface';
import contextManager from '@/context-manager/index';
import useWxJsApiInfo from '@/hooks/wx-jsapi-info';
import { BONUS_ICON_URL, BONUS_LABEL, ELANGUAGE } from '@/utils/constants';
import { playBonusAudio } from '@/utils/play-audio';
import { ThousandNum } from '@/utils/string-utils';
import { ActionSheet, Button, InputItem, Modal, Toast } from 'antd-mobile';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

TweenOne.plugins.push(Children);

function Bonus(props) {
  useWxJsApiInfo();
  const [lang, setLang] = useState(ELANGUAGE.CN);
  let [kpiAchievement, setKpiAchievement] = useState({} as IKpiAchievementData);
  let [modalVisible, setModalVisible] = useState<boolean>(false);
  let [numAnimation, setNumAnimation] = useState(undefined);
  let [showAnimation, setShowAnimation] = useState<boolean>(false);
  let [inputing, setInputing] = useState<boolean>(false);
  let [calculateable, setCalculateable] = useState<boolean>(false);
  let [bonusDict, setBonusDict] = useState({
    band: '',
    bonusBase: 0,
    bonusRat: 0,
  });
  let [inputForm, setInputForm] = useState({
    individualTarget: '',
    bonusBase: '',
    sizePie: undefined,
    entifyTarget: undefined,
    monthlyBasePay: undefined,
  });
  const inputRef = useRef();

  const context = useContext(contextManager);
  const {
    global: { accessToken },
  } = context;

  const {
    hi,
    employeeId,
    calculationFormula,
    grossBonus,
    bonusSimulator,
    sizePie,
    entifyTarget,
    individualTarget,
    individualTargetDes,
    input,
    kpiName,
    weight,
    achievement,
    monthlyBasePay,
    bonusBase,
    targetBonus,
    bonusBaseDes,
    bandMultiplier,
    bandMultiplierDes,
    calculationResults,
    calculate,
    statementCalculation,
    iconLangUrl,
    formulaUrl,
    statements,
    keyboardDone,
    noUserTips,
    noKpiTips,
    cny,
  } = BONUS_LABEL[lang];

  useEffect(() => {
    var lang = navigator.language;
    lang = lang.substr(0, 2);

    if (lang === 'zh') {
      setLang(ELANGUAGE.CN);
    } else {
      setLang(ELANGUAGE.EN);
    }
    if (history.location.query && history.location.query.lang) {
      if (history.location.query.lang === 'cn') {
        setLang(ELANGUAGE.CN);
      } else if (history.location.query.lang === 'en') {
        setLang(ELANGUAGE.EN);
      }
    }
    wx.ready(() => {
      wx.hideOptionMenu();
      wx.hideMenuItems({
        menuList: [
          /* 'menuItem:setFont', */ 'menuItem:refresh',
          'menuItem:copyUrl',
        ], // 要隐藏的菜单项
      });
      // wx.checkJsApi({
      //   jsApiList: ['getSystemInfo'],
      //   success: function (res) {
      //     console.log('MMHH-checkJsApi', res);
      //   },
      // });
      // wx.getSystemInfo({
      //   success: (res) => {
      //     console.log('MMHH success', res);
      //   },
      //   fail: (fail) => {
      //     console.log(fail);
      //   },
      // });
    });
  }, []);
  useEffect(() => {
    loadData();
  }, [accessToken]);

  let archievementOptions;

  const customIcon = (tag = 1) => (
    <div>
      <div
        className={styles.error + ' ' + (tag === 1 ? styles.bg1 : styles.bg2)}
      ></div>
      <div style={{ padding: '0px 10px 10px 10px' }}>
        {tag === 1 ? noUserTips : noKpiTips}
      </div>
    </div>
  );

  const loadData = async () => {
    const { data } = await getConfigDicts();
    archievementOptions = data?.kpiAchievementRatDict.map(
      (item) => item.achievementRat + (item.achievementRat ? '%' : ''),
    );
    const dic = {
      band: '',
      bonusBase: 0,
      bonusRat: 0,
    };
    const kpiRes = await getKpiAchievement();
    const band = kpiRes.data?.band || '';
    const employeeCode = kpiRes.data?.employeeCode || '';
    const cname = kpiRes.data?.cname || '';
    const ename = kpiRes.data?.ename || '';
    if (
      !band.length ||
      !employeeCode.length ||
      (!cname.length && !ename.length)
    ) {
      Toast.info(
        customIcon(1),
        2,
        () => {
          wx.closeWindow();
        },
        true,
      );
    }
    if (!kpiRes.data?.kpiAchievementList.length) {
      Toast.info(
        customIcon(2),
        2,
        () => {
          wx.closeWindow();
        },
        true,
      );
    } else {
      let showError = false;
      for (const i in kpiRes.data?.kpiAchievementList) {
        let item: IAchievementItem = kpiRes.data?.kpiAchievementList[i];
        if (!item.weight) {
          showError = true;
          break;
        }
      }
      if (showError) {
        Toast.info(
          customIcon(2),
          2,
          () => {
            wx.closeWindow();
          },
          true,
        );
      }
    }
    setKpiAchievement(kpiRes.data as IKpiAchievementData);
    calculateIndividualTarget(kpiRes.data?.kpiAchievementList);
    if (data) {
      const bonusBases = data.bandBonusBaseDict.filter(
        (item) => item.band === band,
      );
      if (bonusBases.length) {
        dic.bonusBase = bonusBases[0].bonusBase;
        dic.bonusRat = bonusBases[0].bonusRat;
      }
    }
    dic.band = band.replace('-', '');
    // TEST:
    // dic.band = '2B';
    setBonusDict(dic);
  };

  const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(
    window.navigator.userAgent,
  );
  let wrapProps;
  if (isIPhone) {
    wrapProps = {
      onTouchStart: (e) => e && e.preventDefault(),
    };
  }
  /* 语言切换事件 */
  const onChangeLang = () => {
    setLang(lang === ELANGUAGE.CN ? ELANGUAGE.EN : ELANGUAGE.CN);
  };
  /* 计算按钮事件 */
  const onCalculate = () => {
    let {
      entifyTarget /* 实体达成 */,
      individualTarget /* 个人达成 */,
      sizePie /* 奖金池 */,
      bonusBase /* 奖金基数 */,
    } = inputForm;
    let {
      band /* 职级 */,
      bonusBase: bonusBase2 /* 奖金基数 */,
      bonusRat /* 奖金比例 */,
    } = bonusDict;
    let res = 0;
    /* 奖金池 */
    let sp = parseFloat(sizePie || '0');
    sp /= 100;
    if (sp < 0.6) {
      sp = 0;
    } else if (sp > 1.4) {
      sp = 1.4;
    }
    /* 实体达成 */
    let et = parseFloat(entifyTarget || '0');
    et /= 100;
    // if (et < 0.6) {
    //   et = 0;
    // } else
    if (et > 1.4) {
      et = 1.4;
    }
    /* 个人达成 */
    let it = parseFloat(individualTarget || '0');
    it /= 100;
    if (it < 0.35) {
      it = 0;
      et = 0;
    } else if (it > 1) {
      it = 1;
    }
    playBonusAudio();
    res =
      (((sp * 0.7 + et * 0.3) *
        (it / 2 + et / 2) *
        (band >= '5' ? bonusRat : 100)) /
        100) *
      (band >= '5' ? parseFloat(bonusBase || '0') : bonusBase2);
    res = Math.round(res * 100) / 100;
    let t = ThousandNum(res.toFixed(2));

    uploadLog({
      calculateLog: `${kpiAchievement.ename}, ${kpiAchievement.cname}, ${
        kpiAchievement.employeeCode
      }, (${sp * 100}% x 70% + ${et * 100}% x 30%) x (${it * 100}% + ${
        et * 100
      }%) / 2 x ${band >= '5' ? bonusBase : bonusBase2} ${
        band >= '5' ? 'x ' + bonusRat + ' %' : ''
      } = ${t}`,
    });
    setNumAnimation({
      Children: { value: res.toFixed(2), formatMoney: true, floatLength: 2 },
      duration: 800,
    });
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 900);
  };
  /* 计算说明弹框 */
  const onChangeModalVisible = () => {
    setModalVisible(!modalVisible);
  };
  /* KPI达成选择 */
  const onSelectAchievement = (value, index) => {
    return () => {
      setCalculateable(true);
      const options = archievementOptions || ['0', '80%', '90%', '100%'];
      const idx = options.indexOf(value + '%');
      ActionSheet.showActionSheetWithOptions(
        {
          options,
          message: ' ',
          destructiveButtonIndex: idx,
          maskClosable: true,
        },
        (buttonIndex) => {
          if (buttonIndex !== -1) {
            setKpiAchievement((old) => {
              let val = options[buttonIndex];
              old.kpiAchievementList[index].achievement = val.replace('%', '');
              calculateIndividualTarget(old.kpiAchievementList);
              return { ...old };
            });
          }
        },
      );
    };
  };
  /* 计算个人达成 */
  const calculateIndividualTarget = (
    list: Array<IAchievementItem> | undefined,
  ) => {
    if (!list) {
      return;
    }
    let it = 0;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      it +=
        parseFloat(element.weight || '0') *
        parseFloat(element.achievement || '0');
    }
    if (it > 10000) {
      it = 10000;
    }
    setInputForm((perForm) => ({
      ...perForm,
      individualTarget: (it / 100).toFixed(2),
    }));
  };
  const onBlur = (val) => {
    setInputing(false);
  };
  const onFocus = () => {
    !inputing && setInputing(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };
  /* 输入项改变 */
  const onChangeForm = (value, key) => {
    setCalculateable(true);
    if (value && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(value)) {
    } else {
      if (key === 'monthlyBasePay') {
        let v = '';
        if (value === '') {
          v = '';
        } else {
          v = parseFloat(value) * 13 + '';
        }
        setInputForm((perForm) => ({
          ...perForm,
          bonusBase: v,
        }));
      } else {
        if (parseFloat(value) > 140) {
          value = '140';
        }
      }
      setInputForm((old) => {
        old[key] = value;
        return { ...old };
      });
    }
  };

  const { BONUS_BG, DEFAULT_AVATAR, ICON_COIN, BTN_DROP, ICON_CLOSE } =
    BONUS_ICON_URL;
  return (
    <div className={styles.bonus}>
      <img className={styles.bg} src={BONUS_BG}></img>
      <div className={styles.user}>
        {/* 头像 */}
        <img
          src={kpiAchievement.avatar || DEFAULT_AVATAR}
          className={styles.avatar}
        />
        <div className={styles.info}>
          {/* 姓名 */}
          <div className={styles.name}>
            {hi}
            {kpiAchievement &&
              (lang === ELANGUAGE.CN
                ? kpiAchievement.cname || kpiAchievement.ename
                : kpiAchievement.ename || kpiAchievement.cname)}
          </div>
          {/* 工号 */}
          <div className={styles.no}>
            {employeeId}
            {kpiAchievement && kpiAchievement.employeeCode}
          </div>
        </div>
        {/* 切换语言 */}
        <div className={styles.lang} onClick={onChangeLang}>
          <img src={iconLangUrl} />
        </div>
      </div>
      {/* 计算公式 */}
      <div className={styles.formula}>
        <div className={styles.sectionTitle}>{calculationFormula}</div>
        <div className={styles.title}>{grossBonus} = </div>
        <img src={formulaUrl} />
      </div>
      {/* 奖金测算 */}
      <div className={styles.form}>
        <div className={styles.sectionTitle} style={{ marginBottom: '32px' }}>
          {bonusSimulator}
        </div>
        {/* SOP奖金池 */}
        <InputItem
          className={styles.inputBlue}
          type="money"
          placeholder={input}
          extra="%"
          value={inputForm.sizePie}
          onChange={(v) => {
            onChangeForm(v, 'sizePie');
          }}
          locale={{ confirmLabel: keyboardDone }}
        >
          <div>{sizePie}</div>
          <div className={styles.inputDes}>0 ~ 140</div>
        </InputItem>
        {/* 实体达成 */}
        <InputItem
          className={styles.inputYellow}
          type="money"
          placeholder={input}
          extra="%"
          value={inputForm.entifyTarget}
          onChange={(v) => {
            onChangeForm(v, 'entifyTarget');
          }}
        >
          <div>{entifyTarget}</div>
          <div className={styles.inputDes}>0 ~ 140</div>
        </InputItem>
        {/* KPI */}
        <div className={styles.kpis}>
          <div className={styles.kpiItemTitle}>
            <div className={styles.name}>{kpiName}</div>
            <div className={styles.weight}>{weight}</div>
            <div className={styles.achievement}>{achievement}</div>
          </div>
          {kpiAchievement &&
            kpiAchievement.kpiAchievementList &&
            kpiAchievement.kpiAchievementList.map((item, index) => (
              <div className={styles.kpiItem} key={index}>
                <div className={styles.name}>{item.kpiName}</div>
                <div className={styles.weight}>{item.weight}%</div>
                <div className={styles.achievement}>
                  <button
                    onClick={onSelectAchievement(item.achievement, index)}
                  >
                    {item.achievement || ''}%
                    <img src={BTN_DROP} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        {/* 个人达成 */}
        <div className={styles.personal}>
          <div className={styles.label}>
            <div>{individualTarget}</div>
            <div className={styles.inputDes}>{individualTargetDes}</div>
          </div>
          {inputForm.individualTarget && (
            <div className={styles.result}>{inputForm.individualTarget} %</div>
          )}
        </div>
        {/* 月基本工资 */}
        {bonusDict.band >= '5' &&
          (!inputing ? (
            <InputItem
              className={styles.inputGrey}
              style={{ backgroundColor: '#fbf6f7' }}
              type="text"
              placeholder={input}
              extra={cny}
              value={
                inputForm.monthlyBasePay
                  ? ThousandNum(inputForm.monthlyBasePay, 2)
                  : undefined
              }
              onChange={(v) => {
                onChangeForm(v, 'monthlyBasePay');
              }}
              onFocus={() => {
                onFocus();
              }}
            >
              {monthlyBasePay}
            </InputItem>
          ) : (
            <InputItem
              ref={inputRef}
              className={styles.inputGrey}
              style={{ backgroundColor: '#fbf6f7' }}
              type="money"
              placeholder={input}
              extra={cny}
              value={inputForm.monthlyBasePay}
              onChange={(v) => {
                onChangeForm(v, 'monthlyBasePay');
              }}
              onBlur={(v) => {
                onBlur(v);
              }}
            >
              {monthlyBasePay}
            </InputItem>
          ))}
        {/* 奖金基数 */}
        <div className={styles.personal + ' ' + styles.gray}>
          <div className={styles.label}>
            <div>{bonusDict.band >= '5' ? bonusBase : targetBonus}</div>
            {bonusDict.band >= '5' && (
              <div className={styles.inputDes}>{bonusBaseDes}</div>
            )}
          </div>
          {bonusDict.band < '5' && (
            <div className={styles.itemValue}>
              {ThousandNum(bonusDict.bonusBase, 2)}
              {' ' + cny}
            </div>
          )}
          {bonusDict.band >= '5' && inputForm.bonusBase && (
            <div className={styles.itemValue + ' ' + styles.itemValue2}>
              {ThousandNum(inputForm.bonusBase, 2)} <div>{cny}</div>
            </div>
          )}
        </div>
        {/* 奖金比例 */}
        {bonusDict.band >= '5' && (
          <div className={styles.personal + ' ' + styles.gray}>
            <div className={styles.label}>
              <div>{bandMultiplier}</div>
              <div className={styles.inputDes}>{bandMultiplierDes}</div>
            </div>
            <div className={styles.itemValue}>{bonusDict.bonusRat} %</div>
          </div>
        )}
      </div>
      {/* 计算结果 */}
      <div className={styles.bottom}>
        <div className={styles.result}>
          <div className={styles.sectionTitle}>{calculationResults}</div>
          <div className={styles.gross}>
            <div>
              <img src={ICON_COIN} />
              <span>{grossBonus}</span>
            </div>
          </div>
          <div className={styles.count}>
            <div>
              <span className={styles.num}>
                {/* <TweenOne animation={numAnimation}>{result}</TweenOne> */}
                <TweenOne animation={numAnimation}>0.00</TweenOne>
              </span>
              <span className={styles.unit}>{cny}</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Button
            id="loud-link-click"
            className={styles.btn}
            onClick={onCalculate}
          >
            {calculate}
          </Button>
          {showAnimation && (
            <div
              className={
                styles.animation +
                ' ' +
                (showAnimation ? styles.replay : styles.pause)
              }
            />
          )}
        </div>
        <a className={styles.tips} onClick={onChangeModalVisible}>
          {statementCalculation}
        </a>
      </div>
      <Modal visible={modalVisible} transparent maskClosable={false}>
        <div className={styles.modalWrap} style={{ height: 'auto' }}>
          <p className={styles.title}>{statementCalculation}</p>
          {statements.map((item, idx) => (
            <p className={styles.paragraph} key={idx}>
              {item}
            </p>
          ))}
        </div>
        <button className={styles.mpodalClose} onClick={onChangeModalVisible}>
          <img src={ICON_CLOSE} />
        </button>
      </Modal>
    </div>
  );
}

export default Bonus;
