import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Header from './components/Header';
import Player from './page/Player'
import Musiclist from './page/Musiclist'
import {MUSIC_LIST} from './config/config'
import {Router,IndexRoute,Link,Route,hashHistory} from 'react-router'
import Pubsub from 'pubsub-js'
class App extends Component {
    constructor () {
        super()
        this.state = {
            musicList:MUSIC_LIST,
            currentMusicItem : MUSIC_LIST[0],
            repeatType: 'cycle'
        }
    }
    componentDidMount () {
        $("#player").jPlayer({
			supplied: "mp3",
            wmode: "window",
			// useStateClassSkin: true
		});
        this.playMusic(this.state.musicList[0]);
        $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playNext();
		});
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter((music) => {
					return music !== musicItem;
				})
			});
        });
        Pubsub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        })
        Pubsub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        })
        let repeatList = [
			'cycle',
			'once',
			'random'
		];
		Pubsub.subscribe('CHANAGE_REPEAT', () => {
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});
		});
    }
    componentWillUnmount () {
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('CHANAGE_REPEAT');
		Pubsub.unsubscribe('PLAY_NEXT');
		Pubsub.unsubscribe('PLAY_PREV');
    }
    playMusic(musicItem) {
		$("#player").jPlayer("setMedia", {
			mp3: musicItem.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem: musicItem
		});
    }
    playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		if (type === 'next') {		
			index = (index + 1) % this.state.musicList.length;
		} else {
			index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
		}
		let musicItem = this.state.musicList[index];
		this.setState({
			currentMusicItem: musicItem
		});
		this.playMusic(musicItem);
	}
	findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	}
    render () {
        return (
            <div>
                <Header />
                {/* <Player currentMusicItem={this.state.currentMusicItem}/> */}
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
}
export default class Root extends Component {
    render() {
	    return (
		    <Router history={hashHistory}>
		        <Route path="/" component={App}>
		            <IndexRoute component={Player}/>
		            <Route path="/list" component={Musiclist} />
		       </Route>
		    </Router>
		);
	}
}