import { musicList } from '@/api/userserver/index';
import contextManager from '@/context-manager/index';
import React, { Component } from 'react';
import styles from './index.less';

class MusicModule extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      checkMusic:
        'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/selected.png',
      musicData: [],
    };
  }

  componentDidMount() {
    this.getMusicList();

    const {
      global: { musicData },
    } = this.context;
  }

  getMusicList = async () => {
    const res = await musicList({});
    if (res.code === 200) {
      this.setState({
        musicData: res.data,
      });
    }
  };

  switchMusic = (item, index) => {
    const {
      global: { setMusicData },
    } = this.context;
    setMusicData(item);
  };

  render() {
    const {
      global: { musicData },
    } = this.context;
    return (
      <div className={styles.musicModule}>
        {this.state.musicData.map((item, index) => (
          <dl key={item.id} onClick={() => this.switchMusic(item, index)}>
            <dt>
              <img src={item.musicIconUrl} alt="" />
            </dt>
            <dd>
              {musicData && musicData.musicUrl && (
                <audio autoPlay loop={true} src={musicData.musicUrl}></audio>
              )}
              <p className={styles.musicName}>{item.title}</p>
            </dd>
            <img
              src={this.state.checkMusic}
              style={{
                display:
                  (musicData && item.id === musicData.id) ||
                  (!musicData && index === 0)
                    ? 'block'
                    : 'none',
              }}
              alt=""
            />
          </dl>
        ))}
      </div>
    );
  }
}
MusicModule.contextType = contextManager;
export default MusicModule;
