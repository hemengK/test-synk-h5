import contextManager from '@/context-manager/index';
import React, { Component } from 'react';
import styles from '../index.less';

class EditMusicTip extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {
      global: { musicData, setMusicData },
    } = this.context;
    return (
      <div>
        {musicData && musicData.musicUrl ? (
          <div className={styles.PlayMusicTip}>
            <img
              className={styles.tipLogo}
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/yinle@2x.png"
              alt=""
            />
            <span>{musicData.title}</span>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
EditMusicTip.contextType = contextManager;
export default EditMusicTip;
