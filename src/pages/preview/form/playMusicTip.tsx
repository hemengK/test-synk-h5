import contextManager from '@/context-manager/index';
import React, { Component } from 'react';
import styles from '../index.less';

class PlayMusicTip extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      musicChoose: false,
      musicLogo:
        'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bubomusic.png',
    };
  }

  componentDidMount() {}

  switchMusic = () => {
    this.setState({
      musicChoose: !this.state.musicChoose,
    });
    if (this.state.musicChoose == false) {
      this.setState({
        musicLogo:
          'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bofangmusic.png',
      });
    } else {
      this.setState({
        musicLogo:
          'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bubomusic.png',
      });
    }
  };

  render() {
    const {
      global: { musicData, setMusicData, templateData, setTemplateData },
    } = this.context;
    return (
      <div>
        {musicData && musicData.id == 1 ? (
          ''
        ) : (
          <img
            className={styles.musicIcon}
            src={this.state.musicLogo}
            alt=""
            onClick={this.switchMusic}
          />
        )}
        {this.state.musicChoose === true ? (
          <div className={styles.PlayMusicTip}>
            <audio
              autoPlay
              loop={true}
              src={musicData && musicData.musicUrl}
            ></audio>
            <img
              className={styles.tipLogo}
              src="https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/yinle@2x.png"
              alt=""
            />
            <span>{musicData && musicData.title}</span>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
PlayMusicTip.contextType = contextManager;
export default PlayMusicTip;
