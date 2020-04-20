import React from 'react';

class DrumPad extends React.Component {

  handleOnClick = () => {
    this.props.clickHandler(this.props.drumKey);
  }

  render() {
    return (<div className="col-md-4 p-md-3">
      <button id={`jawHarp${this.props.drumKey}`} onClick={this.handleOnClick}
         className="drum-pad btn btn-default w-100 h-100">
        {this.props.drumKey}
        <audio id={this.props.drumKey} className="clip" src={this.props.drumAudio} type="audio/wav"/>
      </button>
    </div>);
  }
}

export default DrumPad;
