import React, { Component, PropTypes } from 'react';
import './musiclistitem.less'
import Pubsub from 'pubsub-js'
export default class Musiclistitem extends Component {
    handlePlaymusic () {
        // console.log(event,this.props.musicItem)
        Pubsub.publish('PLAY_MUSIC',this.props.musicItem)
    }
    handleDeletemusic (event) {
        // console.log(event,musicItem)
        event.stopPropagation(); 
        Pubsub.publish('DELETE_MUSIC',this.props.musicItem)
    }
    render () {
        let musicItem= this.props.musicItem
        return(
            <li onClick={this.handlePlaymusic.bind(this)} className={`components-musiclistitem row ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p onClick={this.handleDeletemusic.bind(this)} className='-col-auto delete'></p>
            </li>
        )
    }
}