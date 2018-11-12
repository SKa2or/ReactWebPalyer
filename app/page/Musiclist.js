import React, { Component, PropTypes } from 'react';
import './musiclist.less';
import Musiclistitem from '../components/Musiclistitem';
export default class Musiclist extends Component {
  render() {
    let listEle = null;
    listEle = this.props.musicList.map(item => {
      return (
        <Musiclistitem key={item.id} musicItem={item} focus ={item === this.props.currentMusicItem}>
          {item.title}
        </Musiclistitem>
      );
    });
    return <ul>{listEle}</ul>;
  }
}
// prop验证
Musiclist.propTypes = {
  // progress: PropTypes.array,
  currentMusicItem: PropTypes.object,
  musicList: PropTypes.array
};
// 默认prop
Musiclist.defaultProps = {};
