import React, { Component, PropTypes } from 'react';
import Progress from '../components/Progress';
import {Link} from 'react-router'
import Pubsub from 'pubsub-js'
import './player.less'

let duration = null;
export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
      volume:0,
      isPlay :true,
      leftTime:''
    };
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration;
      this.setState({
        volume:e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      });
    });
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  handleProgressChange(progress) {
    $('#player').jPlayer('play', duration * progress);
  }
  handlechangeVolume (progress) {
    $('#player').jPlayer('volume', progress);
  }
  play () {
    if(this.state.isPlay) {
      $('#player').jPlayer('pause');
    }else{
      $('#player').jPlayer('play');
    }
    this.setState({
      isPlay : !this.state.isPlay
    })
  }
  handleNext() {
		Pubsub.publish('PLAY_NEXT');
	}
	handlePrev() {
		Pubsub.publish('PLAY_PREV');
	}
	handleChangeRepeat() {
		Pubsub.publish('CHANAGE_REPEAT');
  }
  formatTime(time) {
		time = Math.floor(time);
		let miniute = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);
		return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}
  render() {
    return (
      <div className="player-page">
        <h1 className="caption"><Link to='/list'>我的私人音乐坊 ></Link></h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">
              {this.props.currentMusicItem
                ? this.props.currentMusicItem.title
                : ''}
            </h2>
            <h3 className="music-artist mt10">
              {this.props.currentMusicItem
                ? this.props.currentMusicItem.artist
                : ''}
            </h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{ top: 5, left: -5 }} />
                <div className="volume-wrapper">
                  <Progress
                    progress={this.state.volume}
                    onProgressChange={this.handlechangeVolume}
                    barColor='#000'
                  />
                </div>
              </div>
            </div>
            <div style={{ height: 10, lineHeight: '10px' }}>
              <Progress
                progress={this.state.progress}
                barColor='#ff0000'
                onProgressChange={this.handleProgressChange}
              />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.handlePrev} />
                <i
                  className={`icon ml20 ${
                    this.state.isPlay ? 'pause' : 'play'
                  }`}
                  onClick={this.play.bind(this)}
                />
                <i className="icon next ml20" onClick={this.handleNext} />
              </div>
              <div className="-col-auto">
                <i
                  className={`icon repeat-${this.props.repeatType}`}
                  onClick={this.handleChangeRepeat}
                />
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img
              src={
                this.props.currentMusicItem
                  ? this.props.currentMusicItem.cover
                  : ''
              }
              alt={
                this.props.currentMusicItem
                  ? this.props.currentMusicItem.title
                  : ''
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
