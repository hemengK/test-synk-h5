import { TemplateList } from '@/api/userserver/index';
import contextManager from '@/context-manager/index';
import React, { Component } from 'react';
import styles from './index.less';

class BgImages extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      BgImageData: [],
    };
  }

  componentDidMount() {
    this.init();
  }
  init = async () => {
    const {
      global: { cardData },
    } = this.context;
    const { years } = cardData || {};
    const res = await TemplateList({
      years: years,
    });
    if (res.code === 200) {
      this.setState({
        BgImageData: res.data,
      });
    }
  };

  switchImage = (item) => {
    const {
      global: { setTemplateData },
    } = this.context;
    setTemplateData((pre) => ({ ...pre, ...item }));
  };

  render() {
    const {
      global: { templateData },
    } = this.context;
    return (
      <div className={styles.bgmodule}>
        {this.state.BgImageData.map((item, index) => (
          <p
            key={index + 100000}
            onClick={() => this.switchImage(item)}
            style={{
              borderColor:
                (templateData && item.id === templateData.id) ||
                (!templateData && index === 0)
                  ? '#c40101'
                  : '#ffffff',
            }}
          >
            <img src={item.templateBgimageUrl} alt="" />
            <span>0{index + 1}</span>
          </p>
        ))}
      </div>
    );
  }
}
BgImages.contextType = contextManager;
export default BgImages;
