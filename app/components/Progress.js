import React, { Component ,PropTypes} from 'react';
import './progress.less';
export default class Progress extends Component {
  handleChangeProgress (e) {
    let progressBar = this.refs.progressBar
    let progress = (e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
    // console.log(progress)
    this.props.onProgressChange && this.props.onProgressChange(progress)
  }
  render() {
    return (
      <div className="components-progress" ref='progressBar' onClick={this.handleChangeProgress.bind(this)}>
        <div
          className="progress"
          style={{ width: `${this.props.progress}%`,background:this.props.barColor }}
        />
      </div>
    );
  }
}
// prop验证
Progress.propTypes  = {
    // progress: PropTypes.array,
    onProgressChange :PropTypes.func
}
// 默认prop
Progress.defaultProps = {
    barColor :'#2f9842'
}
